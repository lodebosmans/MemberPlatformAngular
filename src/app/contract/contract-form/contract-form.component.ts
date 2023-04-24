import { Component, OnInit } from '@angular/core';
import { Contract } from '../contract';
import { Subscription } from 'rxjs';
import { Option } from 'src/app/option/option';
import { FormControl, FormGroup } from '@angular/forms';
import { ContractService } from '../contract.service';
import { Router } from '@angular/router';
import { OptionService } from 'src/app/option/option.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  contractId: number =0;

  contract: Contract ={
    id:0,
    contractDate:"",
    // startDate:"",
    // endDate:"",
    contractTypeId:0
  }
  contract$ : Subscription = new Subscription();
  putContract$ : Subscription = new Subscription();
  postContract$ : Subscription = new Subscription();
  option$: Subscription =new Subscription();
  options: Option[] = [];
  contracts: Contract[]=[];

  contractForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    contractDate: new FormControl<string>("",{ nonNullable: true}),
    // startDate: new FormControl<string>("",{ nonNullable: true}),
    // endDate: new FormControl<string>("",{ nonNullable: true}),
    contractTypeId: new FormControl<number>(0, { nonNullable: true }),
  })

  constructor(private router: Router, private contractService: ContractService, private optionService: OptionService,
    private datePipe: DatePipe) {
      this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
      this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
      this.contractId = +this.router.getCurrentNavigation()?.extras.state?.['id'];
      console.log('in constructor: ' + this.contractId)
      if (this.contractId != null && this.contractId > 0){
        this.contract$ = this.contractService.getContractById(this.contractId).subscribe(result => {
          this.contractForm.setValue({
          id: result.id,
          contractDate: result.contractDate,
          // startDate: result.startDate,
          // endDate: result.endDate,
          contractTypeId: result.contractTypeId
        });
        });
      }
      this.option$ = this.optionService.getOptions().subscribe(result => {
        this.options = result;
      });
     }

  ngOnInit(): void {
    if(this.isEdit){
      this.getContractById();}
  }

  getContractById() {
    this.contract$ = this.contractService.getContractById(this.contractId).subscribe(result => 
      this.contract = result);
  }

  onSubmit(): void{
    this.isSubmitted =true;
    if (this.isEdit) {
      console.log("In isEdit")
      console.log(this.contractId)
      console.log(this.contractForm.value)
      this.contract$ = this.contractService.putContract(this.contractId, this.contractForm.getRawValue()).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/contract");
      },
        error => {
          this.errorMessage = error.message;
        });
    }
    if(this.isAdd) {
      console.log(" in Add")
      console.log(this.contractId)
      this.contract$ = this.contractService.postContract(this.contractForm.getRawValue()).subscribe(result => {
        this.router.navigateByUrl("/contract");
      },
      error => {
        this.errorMessage = error.message;
      });
    }

  }

}
