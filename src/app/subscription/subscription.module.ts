import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionOverviewComponent } from './subscription-overview/subscription-overview.component';
import { MatExpansionModule } from '@angular/material/expansion';




@NgModule({
  declarations: [
    SubscriptionComponent,
    SubscriptionFormComponent,
    SubscriptionOverviewComponent,
  
   
  ],
  imports: [
    CommonModule,  
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubscriptionModule { }
