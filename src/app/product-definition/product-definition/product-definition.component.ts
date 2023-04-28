import { Component, OnInit } from '@angular/core';
import { ProductDefinition } from '../product-definition';
import { Subscription } from 'rxjs';
import { ProductDefinitionService } from '../product-definition.service';
import { Router } from '@angular/router';
import { Option } from 'src/app/option/option';

@Component({
  selector: 'app-product-definition',
  templateUrl: './product-definition.component.html',
  styleUrls: ['./product-definition.component.scss']
})
export class ProductDefinitionComponent implements OnInit {

  productDefinition: ProductDefinition ={
    id:0,
    name:"",
    description:"",
    startDate:"",
    endDate:"",
    numberOfSessions:0,
    numberOfGroups:0,
    maxAmountMembers:0,
    price:0,
    dayOfWeek:"",
    parentProductDefinitionId:0,
    productDefinitionFormatId:0,
    productDefinitionSportId:0,
    productDefinitionStatusId:0,
    imageUrl:"",
    subscriptionOpening:"",
    subscriptionClosing:"",
  };
  options: Option[] = [];
  productDefinitions: ProductDefinition [] = [];
  productDefinition$ : Subscription = new Subscription();
  option$: Subscription =new Subscription();
  isLoading = true;
  errorMessage: string='';

  constructor(private productDefinitionService: ProductDefinitionService, private router: Router) { 

  }

  ngOnInit(): void {
    this.getProductDefinitions();
    console.log(this.isLoading);
  }

  getProductDefinitions(){
    this.productDefinition$= this.productDefinitionService.getProductDefinitions().subscribe(result => {
      this.productDefinitions = result;
      this.isLoading = false;
      console.log("alle productDefinitions ", this.productDefinitions)
    });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['productDefinition/edit'], { state: { id: id, mode: 'edit' } });
  }
  add(){
    this.router.navigate(['productDefinition/edit'], { state: {mode: 'add'}});
  }

}
