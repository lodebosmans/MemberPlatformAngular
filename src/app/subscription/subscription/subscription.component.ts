import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Contract } from 'src/app/contract/contract';
import { ContractService } from 'src/app/contract/contract.service';
import { PersonService } from 'src/app/member/person/person.service';
import { ProductAgreement } from 'src/app/product-agreement/product-agreement';
import { ProductAgreementService } from 'src/app/product-agreement/product-agreement.service';
import { ProductDefinition } from 'src/app/product-definition/product-definition';
import { ProductDefinitionService } from 'src/app/product-definition/product-definition.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  productDefinitions: ProductDefinition[] = [];
  contracts: Contract[] = [];
  productAgreements: ProductAgreement[] = [];
  contract$: Subscription = new Subscription();
  productAgreement$: Subscription = new Subscription();
  productDefinition$: Subscription = new Subscription();
  postProductAgreement$: Subscription = new Subscription();
  PostContract$: Subscription = new Subscription();
  isLoading = true;
  errorMessage: string = '';
  person$: Subscription = new Subscription();
  emailAddress: string | undefined;

  constructor(
    private productDefinitionService: ProductDefinitionService,
    private router: Router,
    private contractService: ContractService,
    private productAgreementService: ProductAgreementService,
    private personService: PersonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getProductDefinitions();
    console.log(this.isLoading);
    this.getAuthCredentials();
  }
  getAuthCredentials() {
    this.authService.user$.subscribe((user: User | undefined | null) => {
      // debugger
      this.emailAddress = user?.email;
      console.log('mail', this.emailAddress);
    });
  }

  getProductDefinitions() {
    this.productDefinition$ = this.productDefinitionService
      .getProductDefinitions()
      .subscribe(result => {
        this.productDefinitions = result;
        this.isLoading = false;
        console.log('alle productDefinitions ', this.productDefinitions);
      });
  }
  subscribe(id: number) {
    this.router.navigate(['subscription/subscribe'], {
      state: { id: id, mode: 'edit' }
    });
  }
}
