import { Component, OnInit } from '@angular/core';
import { PriceAgreement } from '../price-agreement';
import { Observable } from 'rxjs';
import { PriceAgreementService } from '../price-agreement.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Option } from 'src/app/option/option';
import { OptionService } from 'src/app/option/option.service';

@Component({
  selector: 'app-price-agreement-form',
  templateUrl: './price-agreement-form.component.html',
  styleUrls: ['./price-agreement-form.component.scss']
})
export class PriceAgreementFormComponent implements OnInit {
  isEdit: boolean = false;
  priceAgreementId: number = 0;
  isSubmitted: boolean = false;
  errorMessage: string = '';

  priceAgreement: PriceAgreement = {
    id:0,
    priceAgreementStatusId:0,
    paymentDate:'',
    priceBillable:0,
    approverId:0,
    comment:'',
    contractId:0,
    discountAmount:0,
    discountTypeId:0,
    structuredMessage:''
  };
  priceAgreement$?: Observable<PriceAgreement>;
  postPriceAgreement?: Observable<PriceAgreement>;
  optionsByStatus?: Observable<Option[]> | any;

  priceAgreementForm = new FormGroup({
    id: new FormControl<number>(0,{nonNullable:true}),
    priceAgreementStatusId: new FormControl<number>(0,{nonNullable:true}),
    paymentDate: new FormControl<string>(''),
    priceBillable: new FormControl<number>(0),
    approverId: new FormControl<number>(0),
    contractId: new FormControl<number>({ value: 0, disabled: true }, { nonNullable: true }),
    discountAmount: new FormControl<number>(0),
    discountTypeId: new FormControl<number>(0),
    comment: new FormControl<string>(''),
    structuredMessage: new FormControl<string>('')

  })

  constructor(private priceAgreementService: PriceAgreementService, private router: Router,
    private datePipe: DatePipe, private optionService: OptionService) {
    this.isEdit =
    this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.priceAgreementId = +this.router.getCurrentNavigation()?.extras
    .state?.['id'];
    // console.log('in constructor: ' + this.priceAgreementId);

    if(this.priceAgreementId !=null && this.priceAgreementId >0){
      this.priceAgreement$ = this.priceAgreementService.getPriceAgreementById(this.priceAgreementId);
      // console.log('pr', this.priceAgreement$)
      this.priceAgreement$.subscribe(priceAgreement => {
        this.priceAgreementForm.setValue({
          id: 0,
          priceAgreementStatusId: priceAgreement.priceAgreementStatusId,
          paymentDate: this.datePipe.transform( priceAgreement.paymentDate, 'yyyy-MM-dd') ?? null,
          priceBillable: priceAgreement.priceBillable,
          approverId: priceAgreement.approverId,
          contractId: priceAgreement.contractId,
          discountAmount: priceAgreement.discountAmount,
          discountTypeId: priceAgreement.discountTypeId,
          comment: '',
          structuredMessage: priceAgreement.structuredMessage
        });
      });
    }
    this.optionsByStatus = this.optionService.getOptionsByTypeAsync("Status");
   }

  ngOnInit(): void {
    if (this.isEdit) {
      this.getPriceAgreementById();   
    }
  }

  getPriceAgreementById(){
    this.priceAgreement$ = this.priceAgreementService.getPriceAgreementById(this.priceAgreementId);
  }
 

  onSubmit(){
    this.isSubmitted = true;
    this.postPriceAgreement = this.priceAgreementService.postPriceAgreement(this.priceAgreementForm.getRawValue());
    this.postPriceAgreement.subscribe(
      (result) => {
        // handle success
        // console.log(result);
        this.router.navigateByUrl('/subscriptionList');
      },
      (error) => {
        // handle error
        // console.log(error);
      }
    );

  }

}
