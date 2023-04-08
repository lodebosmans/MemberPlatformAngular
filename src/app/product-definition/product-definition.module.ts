import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductDefinitionComponent } from './product-definition/product-definition.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDefinitionFormComponent } from './product-definition-form/product-definition-form.component';



@NgModule({
  declarations: [
    ProductDefinitionComponent,
    ProductDefinitionFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [DatePipe]
})
export class ProductDefinitionModule { }
