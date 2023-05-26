import { Component, OnInit } from '@angular/core';
import { SubscriptionDTO } from '../subscriptionDTO';
import { SubscriptionService } from '../subscription.service';
import { Observable } from 'rxjs';
import { Option } from 'src/app/option/option';
import { OptionService } from 'src/app/option/option.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: []
  
})
export class SubscriptionListComponent implements OnInit {
  subscriptions? : Observable<SubscriptionDTO[]> = this.subscriptionService.getSubscriptionsAsync();
  options? : Observable<Option[]>;
  searchText: string = '';
  isLoading = true;
  

  constructor(private subscriptionService: SubscriptionService, private optionService: OptionService,
    private router: Router) { }

  ngOnInit(): void {
    // this.subscriptions = this.subscriptionService.getSubscriptionsAsync();
    this.options = this.optionService.getOptions();
    this.isLoading=false;
    debugger
  }

  update(id:number){
    this.router.navigate(['priceAgreement/edit'], {
      state: { id: id, mode: 'edit' }
    });
  }

}
