import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { Observable, of } from 'rxjs';
import { PersonService } from './member/person/person.service';
import { Person } from './member/person/person';
import { Router } from '@angular/router';
import { RoleService } from './role.service';

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

  public get isRegistered() {
    return this.roleService.isRegistered;
  }
  public get isTrainer() {
    return this.roleService.isTrainer;
  }
  public get isAdmin() {
    return this.roleService.isAdmin;
  }

  constructor(
    private observer: BreakpointObserver,
    public authService: AuthService,
    private personService: PersonService,
    private router: Router,
    private roleService: RoleService,
  ) {
    // Get the email address of the authenticated user
    // debugger
    this.authService.user$.subscribe((user: User | undefined | null) => {
      // debugger
      this.emailAddress = user?.email;
      this.emailAddressEncoded = this.emailAddress ? encodeURIComponent(this.emailAddress) : '';
      this.firstName = user?.given_name;
      this.lastName = user?.family_name;
      // debugger

      // Check if the person is registered or not
      personService.getPersonByEmailAddress(this.emailAddressEncoded).subscribe((mymembers: Person[] | null) => {
        console.log('Repons op email addres in db:');
        console.log(mymembers);

        // debugger
        if (mymembers != null) {
          // Check if the person is an admin (or trainer)
          let test$ = this.roleService.checkForAdminRights(mymembers[0].id).subscribe(result => {
            debugger
            this.roleService.isAdmin = result;
          });


          this.mymembers = mymembers;
          // debugger
          this.navigateToHome();
        } else {
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

  navigateToHome() {
    debugger
    this.roleService.isRegistered = true;
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.router.navigate(['mymembers/']);
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe(res => {
      if (res.matches) {
        if (this.sidenav) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        }
      } else {
        if (this.sidenav) {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }
    });
  }
}
