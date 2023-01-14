/* 
Title: auth.guard.ts
Author: William Watlington
Date: 14 January 2023
Description: guard for nodebucket app
*/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {} 

  // checks if session_user cookie has been set, if it has return true, otherwise return false and return to login page
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const sessionUser = this.cookieService.get('session_user');

      if(sessionUser) {
        return true;
      } else {
        this.router.navigate(['/session/login']);
        return false;
      }
  } 
}
