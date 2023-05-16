import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionOverviewComponent } from './subscription-overview/subscription-overview.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { OptionNamePipe } from './name.pipe';
import { FilterPipe } from './filter.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButton, MatButtonModule } from '@angular/material/button';





@NgModule({
  declarations: [
    SubscriptionComponent,
    SubscriptionFormComponent,
    SubscriptionOverviewComponent,
    SubscriptionListComponent,
    OptionNamePipe,
    FilterPipe,
    MatExpansionModule,
    MatButtonModule
    
  
 
  
   
  ],
  imports: [
    CommonModule,  
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubscriptionModule { }
