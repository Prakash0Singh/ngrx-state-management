import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Auth } from "@angular/fire/auth"
import { AuthResponse } from '../store/models/authresponse.model';
import { Observable } from 'rxjs';
import { User } from '../store/models/usermodel';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { autologoutUser } from '../auth/state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timeOutInterval: any;

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getUserlogin(email: string, password: string): Observable<AuthResponse> {
    let data = { email, password, returnSecureToken: true }
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, data)
  }

  createNewUser(email: string, password: string): Observable<AuthResponse> {
    let data = { email, password, returnSecureToken: true }
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`, data)
  }

  formateUser(data: AuthResponse) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user
  }

  getErrorMessage(message: string) {
    return message
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user))

    //  this.runTimeOutInterval(user)
  }

  runTimeOutInterval(user: User) {
    const todayDate = new Date().getTime()
    const expirationDate = new Date(user.expireDate).getTime();

    const timeInterval = expirationDate - todayDate;


    this.timeOutInterval = setTimeout(() => {
      //Logout functionality
      // console.log('User AUto Logout',timeInterval)
      this.store.dispatch(autologoutUser())

    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userdataString = localStorage.getItem("userData")
    if (userdataString) {
      const userdata = JSON.parse(userdataString)
      console.log(userdata, "0000")
      const expireTime = new Date(userdata.expirationDate)
      const user = new User(userdata.email, userdata.token, userdata.localId, expireTime)
      this.runTimeOutInterval(user)
      return user
    }
    return null
  }




  logoutUser() {
    {
      localStorage.removeItem('userData');
      if (this.timeOutInterval) {
        clearTimeout(this.timeOutInterval);
        this.timeOutInterval = null;
      }
    }
  }

}
