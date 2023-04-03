import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './member/person/person-form/person-form.component';
import { PersonOverviewComponent } from './member/person/person-overview/person-overview.component';
import { OptionFormComponent } from './option/option-form/option-form.component';
import { OptionComponent } from './option/option/option.component';


const routes: Routes = [
  { path: 'profile', component: PersonOverviewComponent },
  { path: 'profile/edit', component: PersonFormComponent },
  { path: 'option', component: OptionComponent},
  { path: 'option/edit', component: OptionFormComponent},
  { path: 'option/add', component: OptionFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
