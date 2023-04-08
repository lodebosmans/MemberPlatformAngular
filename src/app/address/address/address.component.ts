import { Component, OnInit } from '@angular/core';
import { Address } from '../address';
import { Option } from 'src/app/option/option';
import { Subscription } from 'rxjs';
import { AddressService } from '../address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

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
  };
  options: Option[] = [];
  addresses: Address[]= [];
  address$: Subscription =new Subscription();
  option$: Subscription =new Subscription();
  isLoading = true;
  errorMessage: string='';

  constructor(private router: Router, private addressService: AddressService) { 

  }

  ngOnInit(): void {
  console.log(this.isLoading);
  this.getAddresses();
  }
  getAddresses(){
    this.address$= this.addressService.getAddresses().subscribe(result => {
      this.addresses = result;
      this.isLoading = false;
      console.log("alle adressen ", this.addresses)
    });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['address/edit'], { state: { id: id, mode: 'edit' } });
  }
  add(){
    this.router.navigate(['address/edit'], { state: {mode: 'add'}});
  }

}
