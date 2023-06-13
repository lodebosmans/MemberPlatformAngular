import { Component, OnInit } from '@angular/core';
import { Contract } from '../contract';
import { Option } from 'src/app/option/option';
import { Subscription } from 'rxjs';
import { ContractService } from '../contract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  contract: Contract = {
    id:0,
    startDate:"",
    endDate:"",
    contractDate:"",
    contractTypeId:0
  };
  options: Option[] = [];
  contracts: Contract[]=[];
  contract$: Subscription = new Subscription();
  option$: Subscription = new Subscription();
  isLoading = true;
  errorMessage: string='';

  constructor(private router: Router, private contractService: ContractService) { }

  ngOnInit(): void {
    this.getContracts();
    // console.log(this.isLoading);
  }

  getContracts(){
    this.contract$= this.contractService.getContracts().subscribe(result => {
      this.contracts = result;
      this.isLoading = false;
      // console.log("alle contracts ", this.contracts)
    });
}
edit(id: number) {
  //Navigate to form in edit mode
  this.router.navigate(['contract/edit'], { state: { id: id, mode: 'edit' } });
}
add(){
  this.router.navigate(['contract/edit'], { state: {mode: 'add'}});
}

}
