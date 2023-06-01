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
import { SubscriptionListComponent } from './subscription/subscription-list/subscription-list.component';
import { AuthGuardAdmin } from './auth.guard';
import { Error403Component } from './error-pages/error403/error403.component';
import { Error404Component } from './error-pages/error404/error404.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'register', component: PersonFormComponent },
  { path: 'profile', component: PersonOverviewComponent },
  { path: 'profile/edit', component: PersonFormComponent },
  { path: 'mymembers', component: MymembersComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'error403', component: Error403Component, pathMatch: 'full'},
  { path: 'error404', component: Error404Component, pathMatch: 'full'},
  { path: 'subscription/subscribe', component: SubscriptionFormComponent },
  { path: 'subscription/overview', component: SubscriptionOverviewComponent },
  // { path: 'option', component: OptionComponent},
  { path: 'option', component: OptionComponent, canActivate: [AuthGuardAdmin], pathMatch: 'full' },
  { path: 'option/edit', component: OptionFormComponent, canActivate: [AuthGuardAdmin] },
  { path: 'option/add', component: OptionFormComponent, canActivate: [AuthGuardAdmin] },
  { path: 'productDefinition', component: ProductDefinitionComponent, canActivate: [AuthGuardAdmin] },
  { path: 'productDefinition/edit', component: ProductDefinitionFormComponent, canActivate: [AuthGuardAdmin] },
  { path: 'priceAgreement', component: PriceAgreementComponent, canActivate: [AuthGuardAdmin] },
  { path: 'priceAgreement/edit', component: PriceAgreementFormComponent, canActivate: [AuthGuardAdmin] },
  { path: 'address', component: AddressComponent, canActivate: [AuthGuardAdmin] },
  { path: 'address/edit', component: AddressFormComponent, canActivate: [AuthGuardAdmin] },
  { path: 'productUnit', component: ProductUnitComponent, canActivate: [AuthGuardAdmin] },
  { path: 'productUnit/edit', component: ProductUnitFormComponent, canActivate: [AuthGuardAdmin] },
  { path: 'contract', component: ContractComponent, canActivate: [AuthGuardAdmin] },
  { path: 'contract/edit', component: ContractFormComponent, canActivate: [AuthGuardAdmin] },
  { path: 'subscriptionList', component: SubscriptionListComponent, canActivate: [AuthGuardAdmin]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
