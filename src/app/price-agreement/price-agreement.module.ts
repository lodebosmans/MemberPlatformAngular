import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceAgreementComponent } from './price-agreement/price-agreement.component';
import { PriceAgreementFormComponent } from './price-agreement-form/price-agreement-form.component';



@NgModule({
  declarations: [
    PriceAgreementComponent,
    PriceAgreementFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PriceAgreementModule { }
