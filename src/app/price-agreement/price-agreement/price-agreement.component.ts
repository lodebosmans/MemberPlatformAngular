import { Component, OnInit } from '@angular/core';
import { PriceAgreement } from '../price-agreement';
import { Option } from 'src/app/option/option';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PriceAgreementService } from '../price-agreement.service';

@Component({
  selector: 'app-price-agreement',
  templateUrl: './price-agreement.component.html',
  styleUrls: ['./price-agreement.component.scss']
})
export class PriceAgreementComponent implements OnInit {

  priceAgreement : PriceAgreement = {
    id:0,
    contractId:0,
    discountTypeId:0,
    approverId:0,
    priceAgreementStatusId:0,
    discountAmount:0,
    priceBillable:0,
    structuredMessage:"",
    paymentDate:"",
    comment:""
  }
  options: Option[] = [];
  priceAgreements : PriceAgreement [] = [];
  priceAgreement$ : Subscription = new Subscription();
  option$: Subscription =new Subscription();
  isLoading = true;
  errorMessage: string='';


  constructor( private router : Router, private priceAgreementService : PriceAgreementService) { }

  ngOnInit(): void {
    this.getPriceAgreements();
  }

  getPriceAgreements(){
    this.priceAgreement$ = this.priceAgreementService.getPriceAgreements().subscribe(result => {
      this.priceAgreements = result;
      this.isLoading = false;
      // console.log("alle priceAgreements ", this.priceAgreements)
    });
  }
  // edit(id: number) {
  //   //Navigate to form in edit mode
  //   this.router.navigate(['priceAgreement/edit'], { state: { id: id, mode: 'edit' } });
  // }

  //id dat is het contractId van de priceAgreement
  
  add(id : number){
    this.router.navigate(['priceAgreement/edit'], { state: {id: id, mode: 'add'}});
  }
}
