import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(private router: Router, private roleService: RoleService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {

    // const allowedRoles = next.data.roles as Role[];
    debugger
    if (this.roleService.isAdmin) {
      // User is authenticated, allow access to the route
      return true; 
    } else {
      // User is not authenticated, redirect to home page
      // this.router.navigate(['error403']);
      debugger
      // return false;
      // return this.router.parseUrl('error403');
      return this.router.navigate(['error403']);
    }
  }
}

