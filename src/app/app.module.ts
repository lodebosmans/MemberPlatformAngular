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
import { OptionModule } from './option/option.module';


// import { PersonOverviewComponent } from './member/person/person-overview/person-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonFormComponent,
  
   
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
 OptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
