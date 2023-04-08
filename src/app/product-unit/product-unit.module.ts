import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductUnitComponent } from './product-unit/product-unit.component';
import { ProductUnitFormComponent } from './product-unit-form/product-unit-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';





@NgModule({
  declarations: [
    ProductUnitComponent,
    ProductUnitFormComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class ProductUnitModule { }
