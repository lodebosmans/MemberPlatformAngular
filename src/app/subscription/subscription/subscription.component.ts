import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { ProductDefinition } from 'src/app/product-definition/product-definition';
import { ProductDefinitionService } from 'src/app/product-definition/product-definition.service';

@Component({
  selector: 'app-subscription',
  template: `<p>subscription works!</p>
  <div>
    <table
      class="table"
      *ngIf="productDefinitions && productDefinitions.length > 0"
    >
      <tbody>
        <tr *ngFor="let p of productDefinitions">
          <th scope="row">{{ p.id }}</th>
          <td>{{ p.name }}</td>
          <td>
            <button type="button" class="btn knop" (click)="subscribe(p.id)">
              Inschrijven
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  productDefinitions: ProductDefinition[] = [];
  productDefinition$: Subscription = new Subscription();
  isLoading = true;
  errorMessage: string = '';
  // person$: Subscription = new Subscription();
  emailAddress: string | undefined;

  constructor(
    private productDefinitionService: ProductDefinitionService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getProductDefinitions();
    console.log(this.isLoading);
    this.getAuthCredentials();
    
  }
  ngOnDestroy(): void{
    this.productDefinition$.unsubscribe();
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
