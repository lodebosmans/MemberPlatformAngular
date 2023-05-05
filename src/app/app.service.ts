import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonService } from './member/person/person.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private path = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
}
