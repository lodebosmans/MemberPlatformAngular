import { Component, OnInit } from '@angular/core';
import { ProductUnit } from '../product-unit';
import { ProductDefinition } from 'src/app/product-definition/product-definition';
import { Subscription } from 'rxjs';
import { Option } from 'src/app/option/option';
import { ProductUnitService } from '../product-unit.service';
import { Router } from '@angular/router';
import { OptionService } from 'src/app/option/option.service';
import { ProductDefinitionService } from 'src/app/product-definition/product-definition.service';

@Component({
  selector: 'app-product-unit',
  templateUrl: './product-unit.component.html',
  styleUrls: ['./product-unit.component.scss']
})
export class ProductUnitComponent implements OnInit {
  productUnit: ProductUnit = {
    id: 0,
    productId: 0,
    date: '',
    comment: '',
    startTimeScheduled: '',
    startTimeActual: '',
    endTimeActual: '',
    endTimeScheduled: '',
    addressId: 0,
    productUnitStatusId: 0
  };
  productDefinitions: ProductDefinition[] = [];
  productUnits: ProductUnit[] = [];
  options: Option[] = [];
  productUnit$: Subscription = new Subscription();
  productDefinition$: Subscription = new Subscription();
  option$: Subscription = new Subscription();
  isLoading = true;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private pruductUnitService: ProductUnitService,
    private optionService: OptionService,
    private productDefinitionService: ProductDefinitionService
  ) {}

  ngOnInit(): void {
    this.getProductUnits();
    console.log(this.isLoading);
  }
  getProductUnits() {
    this.productUnit$ = this.pruductUnitService
      .getProductUnits()
      .subscribe(result => {
        this.productUnits = result;
        this.isLoading = false;
        console.log('alle productUnits ', this.productUnits);
      });
  }
  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['productUnit/edit'], {
      state: { id: id, mode: 'edit' }
    });
  }
  add() {
    this.router.navigate(['productUnit/edit'], { state: { mode: 'add' } });
  }
}
