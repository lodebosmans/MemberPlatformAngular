import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../person';
import { PersonService } from '../person.service';
import { Subscription } from 'rxjs';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-person-overview',
  templateUrl: './person-overview.component.html',
  styleUrls: ['./person-overview.component.scss']
})
export class PersonOverviewComponent implements OnInit {

  person: Person = {
    id: 0,
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    insuranceCompany: "",
    mobilePhone: "",
    emailAddress: "",
    identityNumber: "",
    privacyApproval: true,
    street: "",
    number: "",
    box: "",
    postalCode: "",
    city: "",
    country: "",
    addressType:"",
    parentId: null
  };

  isLoading: boolean = true;
  emailAddress: string | undefined = "";
  person$: Subscription = new Subscription();
 

  constructor(private personService: PersonService, 
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    console.log("In person-overview")
    this.getAuthCredentials();
    this.getPerson();
  }

  ngOnDestroy(): void {
    this.person$.unsubscribe();
    // this.deletePriceListCategory$.unsubscribe();
  }

  getAuthCredentials() {
    this.authService.user$.subscribe((user: User | undefined | null) => {
      // debugger
      this.emailAddress = user?.email;
      console.log('mail', this.emailAddress)
    });
  }

  getPerson() {
    console.log("mm", this.emailAddress)
    let personId = this.personService.getPersonByEmailAddress(this.emailAddress);
    
    console.log('p', personId)
    this.person$ = this.personService.getPersonById(1).subscribe(result => {
      this.person = result;
      this.isLoading = false;
      console.log('Person: ');
      console.log(this.person);
    });
  }

  editPerson(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['profile/edit'], { state: { id: id, mode: 'edit' } });
  }

}
