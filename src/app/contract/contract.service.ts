import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contract } from './contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  api_url = environment.apiUrl + "contract/";

  constructor(private httpClient: HttpClient) { }

  getContracts(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(this.api_url);
  }

  getContractById(id: number): Observable<Contract> {
    return this.httpClient.get<Contract>(this.api_url + id);
  }

  postContract(contract: Contract): Observable<Contract> {
    return this.httpClient.post<Contract>(this.api_url, contract);
  }

  putContract(id: number, contract: Contract): Observable<Contract> {
    return this.httpClient.put<Contract>(this.api_url + id, contract);
  }

  deleteContract(id: number): Observable<Contract> {
    return this.httpClient.delete<Contract>(this.api_url + id);
  }
}
