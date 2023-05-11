import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SubscriptionDTO } from './subscriptionDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  api_url = environment.apiUrl + 'Subscription/';
  constructor(private httpClient: HttpClient) {}
  postSubscription(productId: number, personId: number): Observable<any> {
    const body = {
      productId: productId,
      personId: personId
    };
    return this.httpClient.post<any>(this.api_url, body);
  }
  getAllById(id: number, year: number): Observable<SubscriptionDTO[]> {
    return this.httpClient.get<SubscriptionDTO[]>(
      this.api_url + id + '/' + year
    );
  }
  getSubscriptionsAsync(): Observable<SubscriptionDTO[]> {
    return this.httpClient.get<SubscriptionDTO[]>(
      this.api_url + 'all'
    )
  }
}
