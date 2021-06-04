import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {LocalStorageService} from "./localStorage.service"
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root',
})

export class LoginService {

  constructor(private httpClient: HttpClient,
              private localStorageService: LocalStorageService,
              private router: Router) {
    this.localStorageService.getTokens().subscribe(data => {
      this.token = data.token
      this.refToken = data.refToken
    })
  }

  token: string | undefined = ""
  refToken: string | undefined = ""

  public login(username: string, password: string) {
    let body = {
      username: username,
      password: password,
    }
    this.httpClient.post<{ token: string, refToken: string }>("http://localhost:3000/users", body).subscribe(data => {
      if (!data) return
      this.localStorageService.setUpTokens(data.token, data.refToken)
      this.router.navigateByUrl("").then(r =>{})
    })
  }

  public register(username: string, password: string) {
    let body = {
      username: username,
      password: password,
    }
    this.httpClient.post<{ token: string, refToken: string }>("http://localhost:3000/createUser", body).subscribe(data => {
      if (!data) return
      this.localStorageService.setUpTokens(data.token, data.refToken)
      this.router.navigateByUrl("").then(r => {})
    })
  }

  public updateTokens(): Observable<{ token: string, refToken: string }> {
    console.log("обновляю токен")
    const body = { refToken: this.refToken }
    return this.httpClient.post<{ token: string, refToken: string }>(`http://localhost:3000/users/refreshToken`, body);
  }
}
