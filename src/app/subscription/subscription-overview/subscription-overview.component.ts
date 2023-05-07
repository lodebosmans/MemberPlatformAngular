import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Contract } from 'src/app/contract/contract';
import { ContractService } from 'src/app/contract/contract.service';
import { Person } from 'src/app/member/person/person';
import { PersonService } from 'src/app/member/person/person.service';
import { ProductAgreement } from 'src/app/product-agreement/product-agreement';
import { ProductAgreementService } from 'src/app/product-agreement/product-agreement.service';
import { ProductDefinition } from 'src/app/product-definition/product-definition';
import { ProductDefinitionService } from 'src/app/product-definition/product-definition.service';
import { SubscriptionService } from '../subscription.service';
import { SubscriptionDTO } from '../subscriptionDTO';


@Component({
  selector: 'app-subscription-overview',
  templateUrl: './subscription-overview.component.html',
  styleUrls: ['./subscription-overview.component.scss']
})
export class SubscriptionOverviewComponent implements OnInit {
  productDefinitions: ProductDefinition[] = [];
  contracts: Contract[] = [];
  productAgreements: ProductAgreement[] = [];
  contract$: Subscription = new Subscription();
  productAgreement$: Subscription = new Subscription();
  productDefinition$: Subscription = new Subscription();
  postProductAgreement$: Subscription = new Subscription();
  PostContract$: Subscription = new Subscription();
  subscriptionDTOs: SubscriptionDTO[] = [];
  subscriptionDTO$: Subscription = new Subscription();
  isLoading = true;
  isDetail = false;
  errorMessage: string = '';
  person$: Subscription = new Subscription();
  emailAddress: string | undefined;
  persons: Person[] = [];
  m: string | undefined = '';
  public years: number[] = [];
  public currentYear: number = new Date().getFullYear();
  public selectedYear: number = 2023;

  constructor(
    private productDefinitionService: ProductDefinitionService,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private personService: PersonService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAuthCredentials();
    this.getPerson();
    // populate years array with the last 10 years and the next year from current year
    for (let i = this.currentYear - 10; i <= this.currentYear + 1; i++) {
      this.years.push(i);
    }

  }
  getAuthCredentials(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authService.user$.subscribe((user: User | undefined | null) => {
        this.emailAddress = user?.email;
        console.log('mail', this.emailAddress);
        this.m = this.emailAddress;
        console.log('m', this.m);
        resolve();
      });
    });
  }
  getPerson() {
    console.log('mmm', this.m);
    this.person$ = this.personService
      .getPersonByEmailAddress(this.m)
      .subscribe(result => {
        this.persons = result;
        console.log('r', this.persons);
      });
  }
  show(id: number, SelectedYear: number) {
    this.isDetail = true;
    this.subscriptionDTO$ = this.subscriptionService
      .getAllById(id, SelectedYear)
      .subscribe(result => {
        this.subscriptionDTOs = result;
      });
  }
  back() {
    this.isDetail = false;
  }
}
