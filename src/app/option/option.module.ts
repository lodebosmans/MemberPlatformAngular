import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './option/option.component';
import { OptionFormComponent } from './option-form/option-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    OptionComponent,
    OptionFormComponent

   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    OptionComponent,
    OptionFormComponent
  ],

})
export class OptionModule { }
