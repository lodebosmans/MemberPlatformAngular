import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PriceAgreement } from './price-agreement';

@Injectable({
  providedIn: 'root'
})
export class PriceAgreementService {
  api_url = environment.apiUrl + "PriceAgreement/";

  constructor(private httpClient: HttpClient) { }
  
  getPriceAgreements(): Observable<PriceAgreement[]> {
    return this.httpClient.get<PriceAgreement[]>(this.api_url);
  }

  getPriceAgreementById(id: number): Observable<PriceAgreement> {
    return this.httpClient.get<PriceAgreement>(this.api_url + id);
  }

  postPriceAgreement(priceAgreement: PriceAgreement): Observable<PriceAgreement> {
    return this.httpClient.post<PriceAgreement>(this.api_url, priceAgreement);
  }

  putPriceAgreement(id: number, priceAgreement: PriceAgreement): Observable<PriceAgreement> {
    return this.httpClient.put<PriceAgreement>(this.api_url + id, priceAgreement);
  }

  deletePriceAgreement(id: number): Observable<PriceAgreement> {
    return this.httpClient.delete<PriceAgreement>(this.api_url + id);
  }
}
