import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';
import { environment } from 'src/environments/environment';
import { AuthService, IdToken } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  api_url = environment.apiUrl + 'person/';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  getPersons(): Observable<Person[]> {
    // const headers = this.getAuthHeaders();
    return this.httpClient.get<Person[]>(this.api_url);
  }

  getPersonById(id: number): Observable<Person> {
    // const headers = this.getAuthHeaders();
    return this.httpClient.get<Person>(this.api_url + id);
  }

  getPersonByEmailAddress(emailAddress: string | undefined): Observable<Person[]> {
    debugger
    // const headers = this.getAuthHeaders();
    return this.httpClient.get<Person[]>(this.api_url + 'byemailaddress/' + emailAddress);
  }

  getPersonsIds(emailAddress: string | undefined): Observable<[]> {
    // const headers = this.getAuthHeaders();
    return this.httpClient.get<[]>(this.api_url + 'personsIds/' + emailAddress);
  }

  postPerson(person: Person): Observable<Person> {
    // const headers = this.getAuthHeaders();
    return this.httpClient.post<Person>(this.api_url, person);
  }

  putPerson(id: number, person: Person): Observable<Person> {
    // const headers = this.getAuthHeaders();
    return this.httpClient.put<Person>(this.api_url + id, person);
  }

  deletePerson(id: number): Observable<Person> {
    // const headers = this.getAuthHeaders();
    return this.httpClient.delete<Person>(this.api_url + id);
  }
}
