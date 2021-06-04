import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Router} from '@angular/router'
import {LocalStorageService} from "../app/services/localStorage.service"
import {map, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private localStorageService: LocalStorageService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.localStorageService.getTokens().
      pipe(map((tokens) => (!!tokens.token && !!tokens.refToken)),
      tap(result => {
        if(!result) this.router.navigateByUrl("/login")
      }));
  }
}
