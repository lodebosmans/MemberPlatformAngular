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
  parentId: number | null = null;
  addressType: string = "Residential";
  firstName: string = '';
  lastName: string = '';
  emailAddress: string = '';

  isSubmitted: boolean = false;
  errorMessage: string = '';
  nameChangeMessage: string = '';

  // Initialize person object
  person: Person = {
    id: 0,
    firstName: "     ",
    lastName: "     ",
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
    parentId: null
  };
  person$: Subscription = new Subscription();
  postPerson$: Subscription = new Subscription();
  putPerson$: Subscription = new Subscription();

  // reactive form
  personForm = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true })!,
    firstName: new FormControl<string>('', { nonNullable: true }),
    lastName: new FormControl<string>('', { nonNullable: true }),
    gender: new FormControl<string>('', { nonNullable: true }),
    dateOfBirth: new FormControl<string>('', { nonNullable: true }),
    insuranceCompany: new FormControl<string>('', { nonNullable: true }),
    mobilePhone: new FormControl<string>('', { nonNullable: true }),
    emailAddress: new FormControl<string>({ value: '', disabled: true }, { nonNullable: true }),
    identityNumber: new FormControl<string>('', { nonNullable: true }),
    privacyApproval: new FormControl<boolean>(true, { nonNullable: true }),
    street: new FormControl<string>('', { nonNullable: true }),
    number: new FormControl<string>('', { nonNullable: true }),
    box: new FormControl<string | null>(''),
    postalCode: new FormControl<string>('', { nonNullable: true }),
    city: new FormControl<string>('', { nonNullable: true }),
    country: new FormControl<string>('', { nonNullable: true }),
    addressType: new FormControl<string>('', { nonNullable: true }),
    parentId: new FormControl<number | null>(null),
  });



  constructor(private router: Router, private personService: PersonService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.personId = +this.router.getCurrentNavigation()?.extras.state?.['id'];
    this.parentId = +this.router.getCurrentNavigation()?.extras.state?.['parentId'];
    this.firstName = this.router.getCurrentNavigation()?.extras.state?.['firstName'] ?? '';
    this.lastName = this.router.getCurrentNavigation()?.extras.state?.['lastName'] ?? '';
    this.emailAddress = this.router.getCurrentNavigation()?.extras.state?.['emailAddress'] ?? '';

    debugger
    console.log('in constructor: ' + this.personId)
    // debugger
    if (this.personId != null && this.personId > 0) {
      this.person$ = this.personService.getPersonById(this.personId).subscribe(result => {
        // If the person exist, add the data to the form.
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
          parentId: result.parentId
        });
      });
    } else {
      // If the person does not exist, send the name and email address to the person form
      // debugger
      this.personForm.setValue({
        id: 0,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: '',
        dateOfBirth: '',
        mobilePhone: '',
        emailAddress: this.emailAddress,
        identityNumber: '',
        insuranceCompany: '',
        privacyApproval: true,
        street: '',
        number: '',
        box: '',
        postalCode: '',
        city: '',
        country: '',
        addressType: this.addressType,
        parentId: this.parentId
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

    if (this.isAdd) {
      console.log("In isAdd")
      console.log(this.personForm.value)
      debugger
      this.postPerson$ = this.personService.postPerson(this.personForm.getRawValue()).subscribe(result => {
        console.log('Plotten variable:')
        console.log(this.personForm.value)
        debugger
        this.router.navigateByUrl("mymembers");
        // this.router.navigate(['mymembers/'], { state: { emailAddressEncoded: this.emailAddressEncoded, mode: 'show' } });
      },
        error => {
          this.errorMessage = error.message;
        });
    }


    if (this.isEdit) {
      console.log("In isEdit")
      console.log(this.personId)
      console.log(this.personForm.value)
      // debugger
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
