import { Component, OnInit } from '@angular/core';
import { Address } from '../address';
import { Option } from 'src/app/option/option';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { OptionService } from 'src/app/option/option.service';
import { AddressService } from '../address.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  addressId: number = 0;

  address: Address = {
    id:0,
    name:"",
    street:"",
    number:"",
    box:"",
    postalCode:"",
    city:"",
    country:"",
    addressTypeId:0
    
  }
  address$ : Subscription = new Subscription();
  putAddress$ : Subscription = new Subscription();
  postAddress$: Subscription = new Subscription();
  // option$: Subscription =new Subscription();
  // options: Option[] = [];
  optionsByAddress?: Observable<Option[]> | any = this.optionService.getOptionsByTypeAsync("Address");

  addressForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    name: new FormControl<string>(''),
    street: new FormControl<string>("", { nonNullable: true }),
    number: new FormControl<string>("", { nonNullable: true }),
    box: new FormControl<string>(""),
    postalCode: new FormControl<string>("", { nonNullable: true }),
    city: new FormControl<string>("", { nonNullable: true }),
    country: new FormControl<string>("", { nonNullable: true }),
    addressTypeId: new FormControl<number>(0, { nonNullable: true }),
  })
  

  constructor(private router: Router, private addressService: AddressService, private optionService: OptionService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.addressId = +this.router.getCurrentNavigation()?.extras.state?.['id'];
    console.log('in constructor: ' + this.addressId)

    if (this.addressId != null && this.addressId > 0){
      this.address$ = this.addressService.getAddressById(this.addressId).subscribe(result => {
        console.log(result);
        this.addressForm.setValue({
          id: result.id,
          name: result.name,
         street:result.street,
         number:result.number,
         box:result.box,
         postalCode:result.postalCode,
         city:result.city,
         country:result.country,
         addressTypeId:result.addressTypeId
        });
      });
    }
    // this.option$ = this.optionService.getOptions().subscribe(result => {
    //   this.options = result;
    // });
  }

  ngOnInit(): void {
    if(this.isEdit){
      this.getAddressById();}
  }
  ngOnDestroy(): void {
    // this.option$.unsubscribe();
    this.address$.unsubscribe();
    this.postAddress$.unsubscribe();
    this.putAddress$.unsubscribe();
  }
  getAddressById() {
    this.address$ = this.addressService.getAddressById(this.addressId).subscribe(result => this.address = result);
  }
  onSubmit(): void{
    this.isSubmitted =true;
    if (this.isEdit) {
      console.log("In isEdit")
      console.log(this.addressId)
      console.log(this.addressForm.value)
      this.putAddress$ = this.addressService.putAddress(this.addressId, this.addressForm.getRawValue()).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/address");
      },
        error => {
          this.errorMessage = error.message;
        });
    }
    if(this.isAdd) {
      console.log(" in Add")
      console.log(this.addressId)
      this.postAddress$ = this.addressService.postAddress(this.addressForm.getRawValue()).subscribe(result => {
        this.router.navigateByUrl("/address");
      },
      error => {
        this.errorMessage = error.message;
      });
    }

  }
}
