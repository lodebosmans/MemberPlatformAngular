import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contract } from 'src/app/contract/contract';
import { ContractService } from 'src/app/contract/contract.service';
import { Option } from 'src/app/option/option';
import { OptionService } from 'src/app/option/option.service';
import { ProductDefinitionService } from 'src/app/product-definition/product-definition.service';
import { SubscriptionService } from '../subscription.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})

export class SubscriptionFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  productDefinitionId: number =0;
  productDefinition: any= {};
  contractId: number = 1;

  contracts: Contract[]=[];
  contract$: Subscription = new Subscription();
  options: Option[]=[];
  postContract$: Subscription = new Subscription();
  productDefinition$ : Subscription = new Subscription();
  option$ : Subscription = new Subscription();
  subscriptionform = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    startDate: new FormControl<string>("", { nonNullable: true }),
    endDate: new FormControl<string>("", { nonNullable: true }),
    contractDate: new FormControl<string>("", { nonNullable: true }),
    contractTypeId: new FormControl<number>(0, { nonNullable: true })

  })

  constructor(private router: Router, private productDefinitionService: ProductDefinitionService,
    private optionService: OptionService, private subscriptionService: SubscriptionService,
    private contractService : ContractService) { 
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.productDefinitionId = +this.router.getCurrentNavigation()?.extras.state?.['id'];
    console.log('in constructor: ' + this.productDefinitionId);
    // console.log('in constructor: ' + this.contractId)
      if(this.contractId != null && this.contractId>0){
      this.contract$ = this.productDefinitionService.getProductDefinitionById(this.productDefinition).subscribe(result => {

      
      this.subscriptionform.setValue({
        id: result.id,
        startDate: result.startDate,
        endDate: result.endDate,
        contractDate:Date.now().toString(),
        contractTypeId: 6
      })
      console.log('res',result)
      });
    }
    
    if (this.productDefinitionId != null && this.productDefinitionId > 0){
      this.productDefinition$ = this.productDefinitionService.getProductDefinitionById(this.productDefinitionId).subscribe(result => {
        console.log('r',result);
  
      });
  }
  }
  ngOnInit(): void {
if (this.isEdit == true){
  console.log('edit?', this.isEdit)
    this.productDefinition$ = this.productDefinitionService.getProductDefinitionById(this.productDefinitionId).subscribe(result => {
      this.productDefinition =result} );

      this.option$ = this.optionService.getOptions().subscribe(result => {
        this.options = result;
      });
    }
    console.log(this.subscriptionform)
    console.log('tothier')
  
  }

  onSubmit(): void{

    
    if (this.isSubmitted == false){
      debugger
    this.postContract$ = this.contractService.postContract(this.subscriptionform.getRawValue()).subscribe(result => {
      //all went well
     
      this.router.navigateByUrl("/subscription");
    },
      error => {
        this.errorMessage = error.message;
      });

  }
  this.isSubmitted =true;
}
}
