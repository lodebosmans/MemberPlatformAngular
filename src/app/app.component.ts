import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { Observable, of } from 'rxjs';
import { PersonService } from './member/person/person.service';
import { Person } from './member/person/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  emailAddress: string | undefined = '';
  emailAddressEncoded: string = '';
  personId: number = 0;
  firstName: string | undefined = '';
  lastName: string | undefined = '';
  mymembers: Person[] = [];

  isRegistered: boolean = true;
  // isTrainer: boolean = false;
  // isAdmin: boolean = false;

  constructor(
    private observer: BreakpointObserver,
    public authService: AuthService,
    private personService: PersonService,
    private router: Router
  ) {
    // Get the email address of the authenticated user
    // debugger
    this.authService.user$.subscribe((user: User | undefined | null) => {
      // debugger
      this.emailAddress = user?.email;
      this.emailAddressEncoded = this.emailAddress
        ? encodeURIComponent(this.emailAddress)
        : '';
      this.firstName = user?.given_name;
      this.lastName = user?.family_name;
      // debugger

      // Check if the person is registered or not

      personService
        .getPersonByEmailAddress(this.emailAddressEncoded)
        .subscribe((mymembers: Person[] | null) => {
          console.log('Repons op email addres in db:');
          console.log(mymembers);
          // debugger
          if (mymembers != null) {
            this.mymembers = mymembers;
            this.isRegistered = true;
            // debugger
            // this.router.navigate(['mymembers/'], { state: { emailAddressEncoded: this.emailAddressEncoded, mode: 'show' } });
            this.navigateToMyMembers();
          } else {
            this.isRegistered = false;
            // this.router.navigate(['register/']);
            // debugger
            this.router.navigate(['register/'], {
              state: {
                emailAddress: this.emailAddress,
                firstName: this.firstName,
                lastName: this.lastName,
                mode: 'add'
              }
            });
          }
        });
    });
  }

  navigateToMyMembers() {
    this.router.navigate(['mymembers/']);
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe(res => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
}
