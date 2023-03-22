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
  };
  person$: Subscription = new Subscription();
  postPerson$: Subscription = new Subscription();
  putPerson$: Subscription = new Subscription();

  // reactive form
  personForm = new FormGroup({
    id: new FormControl<number>(0, Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    gender: new FormControl<string>('', Validators.required),
    dateOfBirth: new FormControl<string>('', Validators.required),
    insuranceCompany: new FormControl<string>('', Validators.required),
    mobilePhone: new FormControl<string>('', Validators.required),
    emailAddress: new FormControl<string>('', Validators.required),
    identityNumber: new FormControl<string>('', Validators.required),
    privacyApproval: new FormControl<boolean>(true, Validators.required),
    street: new FormControl<string>('', Validators.required),
    number: new FormControl<string>('', Validators.required),
    box: new FormControl<string>(''),
    postalCode: new FormControl<string>('', Validators.required),
    city: new FormControl<string>('', Validators.required),
    country: new FormControl<string>('', Validators.required),
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
        });
      });
    }
  }


  // constructor(private router: Router, private personService: PersonService, private formBuilder: FormBuilder) {
  //   this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
  //   this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
  //   this.personId = +this.router.getCurrentNavigation()?.extras.state?.['id'];
  
  //   // Use the formBuilder to initialize the form
  //   this.personForm = this.formBuilder.group({
  //     id: [0, Validators.required],
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     gender: ['', Validators.required],
  //     dateOfBirth: ['', Validators.required],
  //     insuranceCompany: ['', Validators.required],
  //     mobilePhone: ['', Validators.required],
  //     emailAddress: ['', Validators.required],
  //     identityNumber: ['', Validators.required],
  //     privacyApproval: [true, Validators.required],
  //     street: ['', Validators.required],
  //     number: ['', Validators.required],
  //     box: [''],
  //     postalCode: ['', Validators.required],
  //     city: ['', Validators.required],
  //     country: ['', Validators.required],
  //   });
  
  //   console.log('in constructor: ' + this.personId)
  
  //   if (this.personId != null && this.personId > 0) {
  //     this.person$ = this.personService.getPersonById(this.personId).subscribe(result => {
  //       console.log(result);
  //       const tempDateTime = new Date(result.dateOfBirth);
  //       const tempUtcDate = new Date(Date.UTC(tempDateTime.getFullYear(), tempDateTime.getMonth(), tempDateTime.getDate()));
  //       const tempDateOnly = tempUtcDate.toISOString().slice(0, 10);  
  //       console.log('Dit is de datum: ')
  //       console.log(tempDateOnly)
  //       this.personForm.patchValue({
  //         id: result.id,
  //         firstName: result.firstName,
  //         lastName: result.lastName,
  //         gender: result.gender,
  //         dateOfBirth: tempDateOnly,
  //         mobilePhone: result.mobilePhone,
  //         emailAddress: result.emailAddress,
  //         identityNumber: result.identityNumber,
  //         insuranceCompany: result.insuranceCompany,
  //         privacyApproval: result.privacyApproval,
  //         street: result.street,
  //         number: result.number,
  //         box: result.box,
  //         postalCode: result.postalCode,
  //         city: result.city,
  //         country: result.country,
  //       });
  //     });
  //   }
  // }


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



    // if (this.isEdit) {
    //   console.log("In isEdit")
    //   console.log(this.personId)
    //   console.log(this.personForm.value)
    //   this.putPerson$ = this.personService.putPerson(this.personId, this.personForm.value).subscribe(result => {
    //     //all went well
    //     this.router.navigateByUrl("/profile/" + this.personId);
    //   },
    //     error => {
    //       this.errorMessage = error.message;
    //     });
    // }
  }

}
