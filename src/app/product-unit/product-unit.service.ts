import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductUnit } from './product-unit';

@Injectable({
  providedIn: 'root'
})
export class ProductUnitService {
  api_url = environment.apiUrl + 'ProductUnit/';

  constructor(private httpClient: HttpClient) { }

  getProductUnits(): Observable<ProductUnit[]> {
    return this.httpClient.get<ProductUnit[]>(this.api_url);
  }

  getProductUnitById(id: number): Observable<ProductUnit> {
    return this.httpClient.get<ProductUnit>(this.api_url + id);
  }

  postProductUnit(productUnit: ProductUnit): Observable<ProductUnit> {
    return this.httpClient.post<ProductUnit>(this.api_url, productUnit);
  }

  putProductUnit(id: number, productUnit: ProductUnit): Observable<ProductUnit> {
    return this.httpClient.put<ProductUnit>(this.api_url + id, productUnit);
  }

  deleteProductUnit(id: number): Observable<ProductUnit> {
    return this.httpClient.delete<ProductUnit>(this.api_url + id);
  }
}
