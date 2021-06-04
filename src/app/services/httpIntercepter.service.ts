import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError, mergeMap, switchMap, take} from "rxjs/operators";
import {LocalStorageService} from "./localStorage.service"
import {LoginService} from "./login.service"
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService,
              private loginService: LoginService,
              private router: Router) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.localStorageService.getTokens().pipe(take(1), mergeMap((authState) => {
      const authReq = this.addToken(req, authState.token);
      return next.handle(authReq).pipe(
        catchError(
          (err) => {
            if (err.status == 401)
              return this.handle401Error(req, next);

            if (err.status == 403)
              return this.handle403Error(req, next);

            return throwError(err);
          }
        )
      )
    }))
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return token ? req.clone({setHeaders: {Authorization: token}}) : req;
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.loginService.updateTokens().pipe(switchMap((tokens) => {
      this.localStorageService.setUpTokens(tokens.token, tokens.refToken)
      return next.handle(this.addToken(req, tokens.token))
    }));
  }

  handle403Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.localStorageService.clearStorage();
    this.router.navigateByUrl("/login");
    return next.handle(req);
  }
}
