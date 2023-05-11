import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDefinitionService } from 'src/app/product-definition/product-definition.service';
import { SubscriptionService } from '../subscription.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService, User } from '@auth0/auth0-angular';
import { Person } from 'src/app/member/person/person';
import { PersonService } from 'src/app/member/person/person.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;
  errorMessage: string = '';
  productDefinitionId: number = 0;
  productDefinition: any = {};
  emailAddress: string | undefined = '';
  person$: Subscription = new Subscription();
  persons: Person[] = [];
  id: number = 0;
  isLoading: boolean = true;

  subscriptionForm: FormGroup | any = {};

  postSubscription$: Subscription = new Subscription();
  productDefinition$: Subscription = new Subscription();

  constructor(
    private router: Router,
    private subscriptionService: SubscriptionService,
    private formbuilder: FormBuilder,
    private productDefinitionService: ProductDefinitionService,
    private authService: AuthService,
    private personService: PersonService
  ) {
    this.isEdit =
      this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.productDefinitionId = +this.router.getCurrentNavigation()?.extras
      .state?.['id'];
    console.log('in constructor: ' + this.productDefinitionId);
    if (this.productDefinitionId != null && this.productDefinitionId > 0) {
      this.productDefinition$ = this.productDefinitionService
        .getProductDefinitionById(this.productDefinitionId)
        .subscribe(result => {
          console.log('result', result);
        });
    }
  }

  ngOnInit(): void {
    this.getAuthCredentials();
    if (this.isEdit) {
      this.getProductDefinitionById();
    }
    const conId = 15;
    const currentDate = new Date().toISOString().substring(0, 10);
    this.subscriptionForm = this.formbuilder.group({
      productId: new FormControl<number>(0, { nonNullable: true }),
      personId: ['', Validators.required]
    });
  }
  getAuthCredentials() {
    this.authService.user$.subscribe((user: User | undefined | null) => {
      // debugger
      this.emailAddress = user?.email;

      this.getPersons();
    });
  }

  getPersons() {
    console.log('mmm', this.emailAddress);
    this.person$ = this.personService
      .getPersonByEmailAddress(this.emailAddress)
      .subscribe(result => {
        this.persons = result;
        console.log('r', this.persons);
      });
  }

  onSubmit(): void {
    console.log('form', this.subscriptionForm);
    if (this.subscriptionForm.valid) {
      const productId = this.subscriptionForm.value.productId;
      const personId = this.subscriptionForm.value.personId;
      console.log('test', productId + '' + personId);

      this.postSubscription$ = this.subscriptionService
        .postSubscription(productId, personId)
        .subscribe(
          result => {
            console.log('test2', result);
            this.router.navigateByUrl('/subscription/overview');
          },
          error => {
            this.errorMessage = error.message;
          }
        );
      this.isSubmitted = true;
    }
  }
  getProductDefinitionById() {
    this.productDefinition$ = this.productDefinitionService
      .getProductDefinitionById(this.productDefinitionId)
      .subscribe(result => (this.productDefinition = result));
  }
  ngOnDestroy():void{
    this.person$.unsubscribe();
    this.productDefinition$.unsubscribe();
    this.postSubscription$.unsubscribe();
  }
}
