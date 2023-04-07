import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PersonFormComponent } from './member/person/person-form/person-form.component';
import { PersonOverviewComponent } from './member/person/person-overview/person-overview.component';

const routes: Routes = [
  { path: '', component: PersonOverviewComponent },
  { path: 'profile', component: PersonOverviewComponent },
  { path: 'profile/edit', component: PersonFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
