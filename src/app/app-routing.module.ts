import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './member/person/person-form/person-form.component';
import { PersonOverviewComponent } from './member/person/person-overview/person-overview.component';
import { OptionFormComponent } from './option/option-form/option-form.component';
import { OptionComponent } from './option/option/option.component';
import { ProductDefinitionComponent } from './product-definition/product-definition/product-definition.component';
import { ProductDefinitionFormComponent } from './product-definition/product-definition-form/product-definition-form.component';
import { AddressComponent } from './address/address/address.component';
import { AddressFormComponent } from './address/address-form/address-form.component';
import { ProductUnitComponent } from './product-unit/product-unit/product-unit.component';
import { ProductUnitFormComponent } from './product-unit/product-unit-form/product-unit-form.component';
import { ContractFormComponent } from './contract/contract-form/contract-form.component';
import { ContractComponent } from './contract/contract/contract.component';
import { SubscriptionComponent } from './subscription/subscription/subscription.component';
import { SubscriptionFormComponent } from './subscription/subscription-form/subscription-form.component';
import { PriceAgreementComponent } from './price-agreement/price-agreement/price-agreement.component';
import { PriceAgreementFormComponent } from './price-agreement/price-agreement-form/price-agreement-form.component';
import { SubscriptionOverviewComponent } from './subscription/subscription-overview/subscription-overview.component';
import { MymembersComponent } from './member/mymembers/mymembers.component';

const routes: Routes = [
  { path: 'register', component: PersonFormComponent },
  { path: 'profile', component: PersonOverviewComponent },
  { path: 'profile/edit', component: PersonFormComponent },
  { path: 'mymembers', component: MymembersComponent },
  { path: 'option', component: OptionComponent },
  { path: 'option/edit', component: OptionFormComponent },
  { path: 'option/add', component: OptionFormComponent },
  { path: 'productDefinition', component: ProductDefinitionComponent },
  { path: 'productDefinition/edit', component: ProductDefinitionFormComponent },
  { path: 'priceAgreement', component: PriceAgreementComponent },
  { path: 'priceAgreement/edit', component: PriceAgreementFormComponent },
  { path: 'address', component: AddressComponent },
  { path: 'address/edit', component: AddressFormComponent },
  { path: 'productUnit', component: ProductUnitComponent },
  { path: 'productUnit/edit', component: ProductUnitFormComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'contract/edit', component: ContractFormComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'subscription/subscribe', component: SubscriptionFormComponent },
  { path: 'subscription/overview', component: SubscriptionOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
