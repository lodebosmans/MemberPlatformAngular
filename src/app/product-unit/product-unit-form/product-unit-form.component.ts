import { Component, OnInit } from '@angular/core';
import { ProductUnit } from '../product-unit';
import { Subscription } from 'rxjs';
import { Option } from 'src/app/option/option';
import { ProductDefinition } from 'src/app/product-definition/product-definition';
import { Address } from 'src/app/address/address';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductUnitService } from '../product-unit.service';
import { OptionService } from 'src/app/option/option.service';
import { AddressService } from 'src/app/address/address.service';
import { Router } from '@angular/router';
import { ProductDefinitionService } from 'src/app/product-definition/product-definition.service';
import { DatePipe, getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-product-unit-form',
  templateUrl: './product-unit-form.component.html',
  styleUrls: ['./product-unit-form.component.scss']
})
export class ProductUnitFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  productUnitId: number = 0;

  productUnit: ProductUnit = {
    id: 0,
    productId: 0,
    date: '',
    comment: '',
    startTimeScheduled: '',
    endTimeScheduled: '',
    startTimeActual: '',
    endTimeActual: '',
    addressId: 0,
    productUnitStatusId: 0
  };
  productUnit$: Subscription = new Subscription();
  putProductUnit$: Subscription = new Subscription();
  postProductUnit$: Subscription = new Subscription();
  option$: Subscription = new Subscription();
  options: Option[] = [];
  productDefinitions: ProductDefinition[] = [];
  productDefinition$: Subscription = new Subscription();
  addresses: Address[] = [];
  address$: Subscription = new Subscription();

  productUnitForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    productId: new FormControl<number>(0, { nonNullable: true }),
    // date: new FormControl<string>('', { nonNullable: true }),
    date: new FormControl(),
    comment: new FormControl<string>('', { nonNullable: true }),
    startTimeScheduled: new FormControl(),
    startTimeActual: new FormControl(),
    endTimeScheduled: new FormControl(),
    endTimeActual: new FormControl(),
    productUnitStatusId: new FormControl<number>(0, { nonNullable: true }),
    addressId: new FormControl<number>(0, { nonNullable: true })
  });
  constructor(
    private router: Router,
    private productUnitService: ProductUnitService,
    private optionService: OptionService,
    private addressService: AddressService,
    private productDefinitionService: ProductDefinitionService,
    private datePipe: DatePipe
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.productUnitId = +this.router.getCurrentNavigation()?.extras.state?.[
      'id'
    ];
    console.log('in constructor: ' + this.productUnitId);

    if (this.productUnitId != null && this.productUnitId > 0) {
      this.productUnit$ = this.productUnitService
        .getProductUnitById(this.productUnitId)
        .subscribe(result => {
          console.log(result);
          console.log(result.startTimeActual);

          this.productUnitForm.setValue({
            id: result.id,
            productId: result.productId,
            date: result.date,
            comment: result.comment,
            startTimeScheduled: result.startTimeScheduled,
            startTimeActual: result.startTimeActual,
            endTimeScheduled: result.endTimeScheduled,
            endTimeActual: result.endTimeActual,
            productUnitStatusId: result.productUnitStatusId,
            addressId: result.addressId
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
    this.address$ = this.addressService.getAddresses().subscribe(result => {
      this.addresses = result;
    });
  }
  ngOnInit(): void {
    this.productUnitForm.get('endTimeActual')?.valueChanges.subscribe(value => {
      if (value) {
        const timeValue = value.split(':');
        const hours = timeValue[0];
        const minutes = timeValue[1];
        const seconds = '00';
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        this.productUnitForm
          .get('endTimeActual')
          ?.setValue(formattedTime, { emitEvent: false });
      }
    });
    this.productUnitForm
      .get('startTimeActual')
      ?.valueChanges.subscribe(value => {
        if (value) {
          const timeValue = value.split(':');
          const hours = timeValue[0];
          const minutes = timeValue[1];
          const seconds = '00';
          const formattedTime = `${hours}:${minutes}:${seconds}`;
          this.productUnitForm
            .get('startTimeActual')
            ?.setValue(formattedTime, { emitEvent: false });
        }
      });
    this.productUnitForm
      .get('endTimeScheduled')
      ?.valueChanges.subscribe(value => {
        if (value) {
          const timeValue = value.split(':');
          const hours = timeValue[0];
          const minutes = timeValue[1];
          const seconds = '00';
          const formattedTime = `${hours}:${minutes}:${seconds}`;
          this.productUnitForm
            .get('endTimeScheduled')
            ?.setValue(formattedTime, { emitEvent: false });
        }
      });
    this.productUnitForm
      .get('startTimeScheduled')
      ?.valueChanges.subscribe(value => {
        if (value) {
          const timeValue = value.split(':');
          const hours = timeValue[0];
          const minutes = timeValue[1];
          const seconds = '00';
          const formattedTime = `${hours}:${minutes}:${seconds}`;
          this.productUnitForm
            .get('startTimeScheduled')
            ?.setValue(formattedTime, { emitEvent: false });
        }
      });
    if (this.isEdit) {
      this.getProductUnitById();
    }
  }
  getProductUnitById() {
    this.productUnit$ = this.productUnitService
      .getProductUnitById(this.productUnitId)
      .subscribe(result => (this.productUnit = result));
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isEdit) {
      console.log('In isEdit');
      console.log(this.productUnitId);
      console.log(this.productUnitForm.value);
      this.putProductUnit$ = this.productUnitService
        .putProductUnit(this.productUnitId, this.productUnitForm.getRawValue())
        .subscribe(
          result => {
            //all went well

            this.router.navigateByUrl('/productUnit');
          },
          error => {
            this.errorMessage = error.message;
          }
        );
    }
    if (this.isAdd) {
      console.log(' in Add');
      console.log(this.productUnitId);
      this.postProductUnit$ = this.productUnitService
        .postProductUnit(this.productUnitForm.getRawValue())
        .subscribe(
          result => {
            this.router.navigateByUrl('/productUnit');
          },
          error => {
            this.errorMessage = error.message;
          }
        );
    }
  }
}
