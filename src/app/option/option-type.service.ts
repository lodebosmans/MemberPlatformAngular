import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OptionType } from './option-type';

@Injectable({
  providedIn: 'root'
})
export class OptionTypeService {
  api_url = environment.apiUrl + "OptionType/";

  constructor(private httpClient: HttpClient) { 
  }
  getOptionTypes(): Observable<OptionType[]> {
    return this.httpClient.get<OptionType[]>(this.api_url);
  }
}
