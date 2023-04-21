import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contract } from '../contract/contract';
import { Observable } from 'rxjs';
import { ProductAgreement } from '../product-agreement/product-agreement';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  api_url = environment.apiUrl + "Contract/";

  constructor(private httpClient: HttpClient ) { }
    createContractWithAgreement(contract: Contract, agreement: ProductAgreement): Observable<Contract> {
      const body = { contract, agreement }
      return this.httpClient.post<Contract>(this.api_url, body)
    }
  
  
}


