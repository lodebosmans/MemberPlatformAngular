import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './member/person/person-form/person-form.component';
import { PersonOverviewComponent } from './member/person/person-overview/person-overview.component';

const routes: Routes = [
  { path: 'profile', component: PersonOverviewComponent },
  { path: 'profile/edit', component: PersonFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
