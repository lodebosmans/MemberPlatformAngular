import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Option } from '../option';
import { OptionService } from '../option.service';
import { OptionType } from '../option-type';
import { OptionTypeService } from '../option-type.service';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss']
})
export class OptionFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  optionId: number = 0;
  isSubmitted: boolean = false;
  errorMessage: string = '';

  // Initialize option object
  option: Option = {
    id: 0,
    name: '',
    optionTypeId: 0
  };

  optionTypes: OptionType[] = [];

  option$: Subscription = new Subscription();
  postOption$: Subscription = new Subscription();
  putOption$: Subscription = new Subscription();
  optionType$: Subscription = new Subscription();

  // reactive form
  optionForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
    optionTypeId: new FormControl<number>(0, { nonNullable: true })
  });

  constructor(
    private router: Router,
    private optionService: OptionService,
    private optionTypeService: OptionTypeService
  ) {
    this.isAdd =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.optionId = +this.router.getCurrentNavigation()?.extras.state?.['id'];
    // console.log('in constructor: ' + this.optionId);

    if (this.optionId != null && this.optionId > 0) {
      this.option$ = this.optionService
        .getOptionById(this.optionId)
        .subscribe(result => {
          // console.log(result);
          this.optionForm.setValue({
            id: result.id,
            name: result.name,
            optionTypeId: result.optionTypeId
          });
        });
    }
    this.optionType$ = this.optionTypeService
      .getOptionTypes()
      .subscribe(result => {
        this.optionTypes = result;
      });
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.getOptionById();
    }

  }

  ngOnDestroy(): void {
    this.option$.unsubscribe();
    this.postOption$.unsubscribe();
    this.putOption$.unsubscribe();
  }

  getOptionById() {
    this.option$ = this.optionService
      .getOptionById(this.optionId)
      .subscribe(result => (this.option = result));
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.isEdit) {
      // console.log('In isEdit');
      // console.log(this.optionId);
      // console.log(this.optionForm.value);
      this.putOption$ = this.optionService
        .putOption(this.optionId, this.optionForm.getRawValue())
        .subscribe(
          result => {
            //all went well
            this.router.navigateByUrl('/option');
          },
          error => {
            this.errorMessage = error.message;
          }
        );
    }
    if (this.isAdd) {
      // console.log(' in Add');
      // console.log(this.optionId);
      this.postOption$ = this.optionService
        .postOption(this.optionForm.getRawValue())
        .subscribe(
          result => {
            this.router.navigateByUrl('/option');
          },
          error => {
            this.errorMessage = error.message;
          }
        );
    }
  }
}