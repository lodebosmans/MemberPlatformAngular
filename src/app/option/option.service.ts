import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Option } from './option';



@Injectable({
  providedIn: 'root'
})
export class OptionService {
  api_url = environment.api_url + "Option/";
  

  constructor(private httpClient: HttpClient) {

   }
   getOptions(): Observable<Option[]> {
    return this.httpClient.get<Option[]>(this.api_url);
  }

  getOptionById(id: number): Observable<Option> {
    return this.httpClient.get<Option>(this.api_url + id);
  }

  postOption(option: Option): Observable<Option> {
    return this.httpClient.post<Option>(this.api_url, option);
  }

  putOption(id: number, option: Option): Observable<Option> {
    return this.httpClient.put<Option>(this.api_url + id, option);
  }

  deleteOption(id: number): Observable<Option> {
    return this.httpClient.delete<Option>(this.api_url + id);
  }
}
