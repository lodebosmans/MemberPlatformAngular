import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceAgreementComponent } from './price-agreement/price-agreement.component';
import { PriceAgreementFormComponent } from './price-agreement-form/price-agreement-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PriceAgreementComponent,
    PriceAgreementFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PriceAgreementModule { }
