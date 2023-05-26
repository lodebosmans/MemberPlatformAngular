import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public isRegistered: boolean = false;
  public isTrainer: boolean = false;
  public isAdmin: boolean = false;

  api_url = environment.apiUrl + "contract/adminRightsExists/";

  constructor(private httpClient: HttpClient) { }

  checkForAdminRights(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(this.api_url + id);
  }


}
