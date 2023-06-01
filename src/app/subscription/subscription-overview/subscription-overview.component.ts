import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/member/person/person';
import { PersonService } from 'src/app/member/person/person.service';
import { SubscriptionService } from '../subscription.service';
import { SubscriptionDTO } from '../subscriptionDTO';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subscription-overview',
  templateUrl: './subscription-overview.component.html',
  styleUrls: ['./subscription-overview.component.scss']
})
export class SubscriptionOverviewComponent implements OnInit {
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
  public selectedYear: number = this.currentYear;
  list: [] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    private personService: PersonService,
    private authService: AuthService,
    private router : Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getAuthCredentials();
    this.getPerson();
    // populate years array with the last 10 years and the next year from current year
    for (let i = this.currentYear - 2; i <= this.currentYear + 1; i++) {
      this.years.push(i);
    }

  }
  ngOnDestroy():void{
    this.person$.unsubscribe();
    this.subscriptionDTO$.unsubscribe();
  }

  getAuthCredentials(): Promise<void> {
    this.isLoading=false;
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
        this.getAllSubscriptions();
      });
  }
 
  getAllSubscriptions() {
      console.log('per', this.persons)
      const allSubscriptions = [];
      for (const person of this.persons) {
        console.log('person', person)
      this.subscriptionService.getAllById(person.id, this.selectedYear).subscribe(result => {
        const subscriptions = result;
        this.subscriptionDTOs.push(...subscriptions)
      });
      console.log('subs', this.subscriptionDTOs)
    }
  }
  onYearChange(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedYear = selectElement.value;
    console.log('Selected year:', selectedYear);
    this.router.navigateByUrl('subscription/overview');
    this.getPerson();
    this.subscriptionDTOs = [];
  }
}
