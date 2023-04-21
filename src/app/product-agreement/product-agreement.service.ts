import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductAgreement } from './product-agreement';

@Injectable({
  providedIn: 'root'
})
export class ProductAgreementService {
  api_url = environment.apiUrl + "ProductAgreement/";

  constructor(private httpClient: HttpClient) { }

  getProductAgreements(): Observable<ProductAgreement[]> {
    return this.httpClient.get<ProductAgreement[]>(this.api_url);
  }

  getProductAgreementById(id: number): Observable<ProductAgreement> {
    return this.httpClient.get<ProductAgreement>(this.api_url + id);
  }

  postProductAgreement(productAgreement: ProductAgreement): Observable<ProductAgreement> {
    return this.httpClient.post<ProductAgreement>(this.api_url, productAgreement);
  }

  putProductAgreement(id: number, productAgreement: ProductAgreement): Observable<ProductAgreement> {
    return this.httpClient.put<ProductAgreement>(this.api_url + id, productAgreement);
  }

  deleteProductAgreement(id: number): Observable<ProductAgreement> {
    return this.httpClient.delete<ProductAgreement>(this.api_url + id);
  }
}
