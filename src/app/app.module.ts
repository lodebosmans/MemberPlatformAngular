import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MemberModule } from './member/member.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonFormComponent } from './member/person/person-form/person-form.component';
import { SignInComponent } from './login/signin/signin.component';
import { SignoutComponent } from './login/signout/signout.component';
import { OptionModule } from './option/option.module';
import { ProductDefinitionModule } from './product-definition/product-definition.module';
// import { PersonOverviewComponent } from './member/person/person-overview/person-overview.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ProductUnitModule } from './product-unit/product-unit.module';
import { AddressModule } from './address/address.module';
import { MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContractModule } from './contract/contract.module';
import { ProductAgreementModule } from './product-agreement/product-agreement.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginButtonModule } from './login-button/login-button.module';
import { PriceAgreementModule } from './price-agreement/price-agreement.module';
import { MymembersComponent } from './member/mymembers/mymembers.component';
import { Error403Component } from './error-pages/error403/error403.component';
import { Error404Component } from './error-pages/error404/error404.component';
import { HomeComponent } from './home/home.component';
// import { InvolvementRoleFormComponent } from './involvement-role/involvement-role-form/involvement-role-form.component';




@NgModule({
  declarations: [
    AppComponent,
    PersonFormComponent,
    SignInComponent,
    SignoutComponent,
    MymembersComponent,
    Error403Component,
    Error404Component,
    HomeComponent,
    // InvolvementRoleFormComponent
    // PersonOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MemberModule,
    HttpClientModule,
    OptionModule,
    ProductDefinitionModule,
    // MatCardModule,
    // MatInputModule,
    ProductUnitModule,
    AddressModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    ContractModule,
    ProductAgreementModule,
    SubscriptionModule,
    PriceAgreementModule,
    AuthModule.forRoot({
      domain: 'lodebosmans.eu.auth0.com',
      clientId: 'dc8iyjLONxtjfDcLBAixsaMspzeLlt0G',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    LoginButtonModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue:"nl-BE"},],
  bootstrap: [AppComponent]
})
export class AppModule { }
