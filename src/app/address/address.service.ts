import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core'
import { Observable } from 'rxjs';
import { Address } from './address';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  api_url = environment.apiUrl + "Address/";

  constructor(private httpClient: HttpClient) { }
  getAddresses(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.api_url);
  }

  getAddressById(id: number): Observable<Address> {
    return this.httpClient.get<Address>(this.api_url + id);
  }

  postAddress(address: Address): Observable<Address> {
    return this.httpClient.post<Address>(this.api_url, address);
  }

  putAddress(id: number, address: Address): Observable<Address> {
    return this.httpClient.put<Address>(this.api_url + id, address);
  }

  deleteAddress(id: number): Observable<Address> {
    return this.httpClient.delete<Address>(this.api_url + id);
  }

  getTrainingFacilities():Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.api_url+'*');
  }
}
