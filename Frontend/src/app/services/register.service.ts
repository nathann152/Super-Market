import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public checkForm(form: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(environment.userUrl+ "check-form", form)
  }
  public addUser(user: UserModel): Observable<any> {
    return this.http.post<UserModel>(environment.userUrl + 'register', user)
  }
  public autoLogin(): Observable<any> {
    return this.http.get<any>(environment.userUrl + 'auto-login', { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } })
  }
  public login(details:object): Observable<any>{
    return this.http.post<any>(environment.userUrl + 'login' , details)
  }
}
