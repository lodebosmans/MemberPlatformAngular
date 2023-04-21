import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SubscriptionComponent,
    SubscriptionFormComponent,
  
   
  ],
  imports: [
    CommonModule,  
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubscriptionModule { }
