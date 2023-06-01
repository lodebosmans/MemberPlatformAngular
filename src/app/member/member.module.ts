import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonOverviewComponent } from './person/person-overview/person-overview.component';
import { PersonService } from './person/person.service';
import { TranslateGenderPipe } from './person/translate-gender.pipe';



@NgModule({
  declarations: [
    PersonOverviewComponent,
    TranslateGenderPipe
  ],
  imports: [
    CommonModule,
   
  ],
  exports: [
    PersonOverviewComponent
  ],
  providers: [
    
  ]
})
export class MemberModule { }
