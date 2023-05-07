import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public isRegistered: boolean = false;
  public isTrainer: boolean = false;
  public isAdmin: boolean = false;

  constructor() { }
}
