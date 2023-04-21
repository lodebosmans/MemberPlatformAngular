import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductDefinition } from './product-definition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDefinitionService {
  api_url = environment.apiUrl + "ProductDefinition/";

  constructor(private httpClient: HttpClient) { }
  getProductDefinitions(): Observable<ProductDefinition[]> {
    return this.httpClient.get<ProductDefinition[]>(this.api_url);
  }

  getProductDefinitionById(id: number): Observable<ProductDefinition> {
    return this.httpClient.get<ProductDefinition>(this.api_url + id);
  }

  postProductDefinition(productDefinition: ProductDefinition): Observable<ProductDefinition> {
    return this.httpClient.post<ProductDefinition>(this.api_url, productDefinition);
  }

  putProductDefinition(id: number, productDefinition: ProductDefinition): Observable<ProductDefinition> {
    return this.httpClient.put<ProductDefinition>(this.api_url + id, productDefinition);
  }

  deleteProductDefinition(id: number): Observable<ProductDefinition> {
    return this.httpClient.delete<ProductDefinition>(this.api_url + id);
  }
}
