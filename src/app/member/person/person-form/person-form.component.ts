import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  addressType: string = "Residential";


  isSubmitted: boolean = false;
  errorMessage: string = '';
  nameChangeMessage: string = '';

  // Initialize person object
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
    addressType: "",
  };
  person$: Subscription = new Subscription();
  postPerson$: Subscription = new Subscription();
  putPerson$: Subscription = new Subscription();

  // reactive form
  personForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    firstName: new FormControl<string>('', { nonNullable: true }),
    lastName: new FormControl<string>('', { nonNullable: true }),
    gender: new FormControl<string>('', { nonNullable: true }),
    dateOfBirth: new FormControl<string>('', { nonNullable: true }),
    insuranceCompany: new FormControl<string>('', { nonNullable: true }),
    mobilePhone: new FormControl<string>('', { nonNullable: true }),
    emailAddress: new FormControl<string>('', { nonNullable: true }),
    identityNumber: new FormControl<string>('', { nonNullable: true }),
    privacyApproval: new FormControl<boolean>(true, { nonNullable: true }),
    street: new FormControl<string>('', { nonNullable: true }),
    number: new FormControl<string>('', { nonNullable: true }),
    box: new FormControl<string>(''),
    postalCode: new FormControl<string>('', { nonNullable: true }),
    city: new FormControl<string>('', { nonNullable: true }),
    country: new FormControl<string>('', { nonNullable: true }),
    addressType: new FormControl<string>('', { nonNullable: true }),
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
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          gender: result.gender,
          dateOfBirth: tempDateOnly,
          mobilePhone: result.mobilePhone,
          emailAddress: result.emailAddress,
          identityNumber: result.identityNumber,
          insuranceCompany: result.insuranceCompany,
          privacyApproval: result.privacyApproval,
          street: result.street,
          number: result.number,
          box: result.box,
          postalCode: result.postalCode,
          city: result.city,
          country: result.country,
          addressType: this.addressType,
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
    this.isSubmitted = true;
    // if (this.isAdd) {
    //   console.log("In isAdd")
    //   console.log(this.personId)
    //   console.log(this.personForm.value)
    //   this.postPerson$ = this.personService.postPerson(this.personForm.value).subscribe(result => {
    //     //all went well
    //     this.router.navigateByUrl("/admin/treatmentupdate/" + this.personForm.value.treatmentCategoryID);

    console.log('Plotten variable:')
    console.log(this.personForm.value)



    // this.router.navigateByUrl("profile");

    //   },
    //     error => {
    //       this.errorMessage = error.message;
    //     });
    // // }



    if (this.isEdit) {
      console.log("In isEdit")
      console.log(this.personId)
      console.log(this.personForm.value)
      this.putPerson$ = this.personService.putPerson(this.personId, this.personForm.getRawValue()).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/profile");
      },
        error => {
          this.errorMessage = error.message;
        });
    }
  }

}
