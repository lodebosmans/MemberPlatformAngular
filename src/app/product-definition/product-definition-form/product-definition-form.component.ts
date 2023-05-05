import { Component, OnInit } from '@angular/core';
import { ProductDefinition } from '../product-definition';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductDefinitionService } from '../product-definition.service';
import { OptionService } from 'src/app/option/option.service';
import { Option } from 'src/app/option/option';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-definition-form',
  templateUrl: './product-definition-form.component.html',
  styleUrls: ['./product-definition-form.component.scss']
})
export class ProductDefinitionFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  productDefinitionId: number = 0;

  productDefinition: ProductDefinition = {
    id: 0,
    name: '',
    description: '',
    numberOfSessions: 0,
    maxAmountMembers: 0,
    startDate: '',
    endDate: '',
    price: 0,
    dayOfWeek: '',
    numberOfGroups: 0,
    parentProductDefinitionId: 0,
    productDefinitionFormatId: 0,
    productDefinitionSportId: 0,
    productDefinitionStatusId: 0,
    imageUrl: '',
    subscriptionOpening: '',
    subscriptionClosing: ''
  };
  productDefinition$: Subscription = new Subscription();
  putProductDefinition$: Subscription = new Subscription();
  postProductDefinition$: Subscription = new Subscription();
  option$: Subscription = new Subscription();
  options: Option[] = [];
  productDefinitions: ProductDefinition[] = [];

  productDefinitionForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    numberOfSessions: new FormControl<number>(0, { nonNullable: true }),
    maxAmountMembers: new FormControl<number>(0, { nonNullable: true }),
    startDate: new FormControl<string>('', { nonNullable: true }),
    endDate: new FormControl<string>('', { nonNullable: true }),
    price: new FormControl<number>(0, { nonNullable: true }),
    dayOfWeek: new FormControl<string>(''),
    numberOfGroups: new FormControl<number>(0),
    parentProductDefinitionId: new FormControl<number>(0),
    productDefinitionFormatId: new FormControl<number>(0, {
      nonNullable: true
    }),
    productDefinitionSportId: new FormControl<number>(0, { nonNullable: true }),
    productDefinitionStatusId: new FormControl<number>(0, {
      nonNullable: true
    }),
    imageUrl: new FormControl<string>(''),
    subscriptionOpening: new FormControl<string>('', { nonNullable: true }),
    subscriptionClosing: new FormControl<string>('', { nonNullable: true })
  });

  constructor(
    private router: Router,
    private productDefinitionService: ProductDefinitionService,
    private optionService: OptionService,
    private datePipe: DatePipe
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.productDefinitionId = +this.router.getCurrentNavigation()?.extras
      .state?.['id'];
    console.log('in constructor: ' + this.productDefinitionId);

    if (this.productDefinitionId != null && this.productDefinitionId > 0) {
      this.productDefinition$ = this.productDefinitionService
        .getProductDefinitionById(this.productDefinitionId)
        .subscribe(result => {
          console.log(result);
          const formattedStartDate =
            this.datePipe.transform(result.startDate, 'yyyy-MM-dd') ?? '';
          const formattedEndDate =
            this.datePipe.transform(result.endDate, 'yyyy-MM-dd') ?? '';
          const formattedSubscriptionClosing =
            this.datePipe.transform(result.subscriptionClosing, 'yyyy-MM-dd') ??
            '';
          const formattedSubscriptionOpening =
            this.datePipe.transform(result.subscriptionOpening, 'yyyy-MM-dd') ??
            '';
          this.productDefinitionForm.setValue({
            id: result.id,
            name: result.name,
            description: result.description,
            numberOfSessions: result.numberOfSessions,
            maxAmountMembers: result.maxAmountMembers,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            price: result.price,
            dayOfWeek: result.dayOfWeek,
            numberOfGroups: result.numberOfGroups,
            parentProductDefinitionId: result.parentProductDefinitionId,
            productDefinitionFormatId: result.productDefinitionFormatId,
            productDefinitionSportId: result.productDefinitionSportId,
            productDefinitionStatusId: result.productDefinitionStatusId,
            imageUrl: result.imageUrl,
            subscriptionClosing: formattedSubscriptionClosing,
            subscriptionOpening: formattedSubscriptionOpening
          });
        });
    }
    this.option$ = this.optionService.getOptions().subscribe(result => {
      this.options = result;
    });
    this.productDefinition$ = this.productDefinitionService
      .getProductDefinitions()
      .subscribe(result => {
        this.productDefinitions = result;
      });
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.getProductDefinitionById();
    }
  }
  getProductDefinitionById() {
    this.productDefinition$ = this.productDefinitionService
      .getProductDefinitionById(this.productDefinitionId)
      .subscribe(result => (this.productDefinition = result));
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isEdit) {
      console.log('In isEdit');
      console.log(this.productDefinitionId);
      console.log(this.productDefinitionForm.value);
      this.putProductDefinition$ = this.productDefinitionService
        .putProductDefinition(
          this.productDefinitionId,
          this.productDefinitionForm.getRawValue()
        )
        .subscribe(
          result => {
            //all went well
            this.router.navigateByUrl('/productDefinition');
          },
          error => {
            this.errorMessage = error.message;
          }
        );
    }
    if (this.isAdd) {
      console.log(' in Add');
      console.log(this.productDefinitionId);
      this.postProductDefinition$ = this.productDefinitionService
        .postProductDefinition(this.productDefinitionForm.getRawValue())
        .subscribe(
          result => {
            this.router.navigateByUrl('/productDefinition');
          },
          error => {
            this.errorMessage = error.message;
          }
        );
    }
  }
}
