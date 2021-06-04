import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE)
              private storage: StorageService,
  ) {
    const token = this.storage.get("token")
    const refToken = this.storage.get("refToken")
    this.tokensSubject.next({token, refToken})
  }

  private tokensSubject: BehaviorSubject<{ token: string, refToken: string }> = new BehaviorSubject<{ token: string, refToken: string }>({
    token: '',
    refToken: ''
  })
  tokens$ = this.tokensSubject.asObservable();

  public setUpTokens(token: any, refToken: any) {
    this.storage.set("token", token)
    this.storage.set("refToken", refToken)
    this.tokensSubject.next({token: token, refToken: refToken})
  }

  public clearStorage() {
    this.storage.remove("refToken")
    this.storage.remove("token")
    this.tokensSubject.next({token: '', refToken: ''})
  }

  public getTokens(): Observable<{ token: string, refToken: string }> {
    return this.tokens$;
  }
}

