import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login-model';
import { Role } from '../models/role';
import { HttpService } from '../services/http/http.service';
import { API_URL_STRING, SESSION } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = true;

  // url authenticate
  private url = `${API_URL_STRING}/auth`

  constructor(
    private http: HttpService,
  ) { }

  login(account: Login) {
    return this.http.postApiAsync<Login>(`${this.url}/signin`, account)
  }

  isAuthorized() {
    let auth = SESSION.getSessionAuthen()
    if (auth === 'undefined') {
      auth = null
    }
    return auth ? true : false
  }

  hasRole(role: Role) {
    return this.isAuthorized() && (SESSION.getSessionRole() === role)
  }
}
