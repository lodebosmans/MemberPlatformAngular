import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  isAdd: boolean = false;
  isEdit: boolean = false;
  personId: number = 0;

  isSubmitted: boolean = false;
  errorMessage: string = '';
  nameChangeMessage: string = '';

  // 
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
    address: {
      id: 0,
      name: "",
      street: "",
      number: "",
      box: "",
      postalCode: "",
      city: "",
      country: "",
      addressType: "",
    }
  };
  person$: Subscription = new Subscription();
  postPerson$: Subscription = new Subscription();
  putPerson$: Subscription = new Subscription();

  // reactive form
  personForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl(''),
    insuranceCompany: new FormControl(''),
    mobilePhone: new FormControl(''),
    emailAddress: new FormControl(''),
    identityNumber: new FormControl(''),
    privacyApproval: new FormControl(true),
    // address: new FormControl(null),
  });


  constructor(private router: Router, private personService: PersonService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.personId = +this.router.getCurrentNavigation()?.extras.state?.['id'];
    console.log('in constructor: ' + this.personId)

    if (this.personId != null && this.personId > 0) {
      this.person$ = this.personService.getPersonById(this.personId).subscribe(result => {
        console.log(result);
        const tempDateTime = new Date(result.dateOfBirth);
        const tempUtcDate = new Date(Date.UTC(tempDateTime.getFullYear(), tempDateTime.getMonth(), tempDateTime.getDate()));
        const tempDateOnly = tempUtcDate.toISOString().slice(0, 10);  
        console.log('Dit is de datum: ')
        console.log(tempDateOnly)
        this.personForm.setValue({
          id: 0,
          firstName: result.firstName,
          lastName: result.lastName,
          gender: result.gender,
          dateOfBirth: tempDateOnly,
          insuranceCompany: result.insuranceCompany,
          mobilePhone: result.mobilePhone,
          emailAddress: result.emailAddress,
          identityNumber: result.identityNumber,
          privacyApproval: result.privacyApproval,
          // address: null,
        });
      });
    }
  }

  ngOnInit(): void {
    this.getPersonById()
  }

  ngOnDestroy(): void {
    this.person$.unsubscribe();
    this.postPerson$.unsubscribe();
    this.putPerson$.unsubscribe();
  }

  getPersonById() {
    this.person$ = this.personService.getPersonById(this.personId).subscribe(result => this.person = result);
  }

  onSubmit(): void {
    // this.isSubmitted = true;
    // if (this.isAdd) {
    //   console.log("In isAdd")
    //   console.log(this.personId)
    //   console.log(this.personForm.value)
    //   this.postPerson$ = this.personService.postPerson(this.personForm.value).subscribe(result => {
    //     //all went well
    //     this.router.navigateByUrl("/admin/treatmentupdate/" + this.personForm.value.treatmentCategoryID);
    this.router.navigateByUrl("profile");
    //   },
    //     error => {
    //       this.errorMessage = error.message;
    //     });
    // }
    // if (this.isEdit) {
    //   console.log("In isEdit")
    //   console.log(this.personId)
    //   console.log(this.personForm.value)
    //   this.putPerson$ = this.personService.putPerson(this.personId, this.personForm.value).subscribe(result => {
    //     //all went well
    //     this.router.navigateByUrl("/admin/treatmentupdate/" + this.personForm.value.treatmentCategoryID);
    //   },
    //     error => {
    //       this.errorMessage = error.message;
    //     });
    // }
  }

}
