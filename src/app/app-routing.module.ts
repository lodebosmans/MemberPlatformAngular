import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonFormComponent } from './member/person/person-form/person-form.component';
import { PersonOverviewComponent } from './member/person/person-overview/person-overview.component';
import { OptionFormComponent } from './option/option-form/option-form.component';
import { OptionComponent } from './option/option/option.component';
import { ProductDefinitionComponent } from './product-definition/product-definition/product-definition.component';
import { ProductDefinitionFormComponent } from './product-definition/product-definition-form/product-definition-form.component';


const routes: Routes = [
  { path: 'profile', component: PersonOverviewComponent },
  { path: 'profile/edit', component: PersonFormComponent },
  { path: 'option', component: OptionComponent},
  { path: 'option/edit', component: OptionFormComponent},
  { path: 'option/add', component: OptionFormComponent},
  { path: 'productDefinition', component: ProductDefinitionComponent},
  { path: 'productDefinition/edit', component: ProductDefinitionFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
