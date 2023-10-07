import { Injectable } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { autoUserLogin, loginStart, loginSuccess, autologoutUser, signupStart, signupSuccess } from "./auth.actions";
import { exhaustMap, map ,catchError, of, tap, mergeMap} from "rxjs";
import { AuthService } from "src/app/service/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/state/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.actions";
import { Router } from "@angular/router";
import { User } from "src/app/store/models/usermodel";


@Injectable()

export class AuthEffects{
    constructor(private actions$:Actions,private authService:AuthService,private store:Store<AppState>,private router:Router) {}

// Login functionality (Log User Effect)

    login$=createEffect(()=>{
        return this.actions$.pipe(
        ofType(loginStart),
        exhaustMap((action) => {
          return this.authService.getUserlogin(action.email, action.password).pipe(
            map((data) => {
              this.store.dispatch(setLoadingSpinner({status:false}))
              this.store.dispatch(setErrorMessage({message:''}))
              const user=this.authService.formateUser(data)
              this.authService.setUserInLocalStorage(user)
              return loginSuccess({user,redirect:true});
            }),
            catchError(error=>{
              this.store.dispatch(setLoadingSpinner({status:false}))
              console.log(error.error.error.message)
              const errMessage=this.authService.getErrorMessage(error.error.error.message)
              return of(setErrorMessage({message:errMessage}))
            })
          );
        })
      );
    })
// auto redirect functionality on login 
    loginRedirect$=createEffect(()=>{

      return this.actions$.pipe(ofType(...[loginSuccess,signupSuccess]),
      tap((action)=>{
        this.store.dispatch(setErrorMessage({message:''}))
        if (action.redirect) {
          this.router.navigate(['/'])
        }
      }))
    },{dispatch:false})

// Create New Account (Sign-up Effect) 

    signUp$=createEffect(()=>{
      return this.actions$.pipe(
        ofType(signupStart),
        exhaustMap((action)=>{
          return this.authService.createNewUser(action.email,action.password).pipe(
            map((data)=>{
              this.store.dispatch(setLoadingSpinner({status:false}))
              const user=this.authService.formateUser(data)
              this.authService.setUserInLocalStorage(user)
              return signupSuccess({user,redirect:true})
            }),
            catchError(error=>{
              this.store.dispatch(setLoadingSpinner({status:false}))
              console.log(error.error.error.message)
              const errMessage=this.authService.getErrorMessage(error.error.error.message)
              return of(setErrorMessage({message:errMessage}))
            })
          )
        })
      )
    })

// Auto Login functionality

autoLogin$=createEffect(()=>{
  return this.actions$.pipe(
    ofType(autoUserLogin),
    mergeMap((action)=>{
      const user=this.authService.getUserFromLocalStorage()
      return of(loginSuccess({user,redirect:false}))
    })
  )
})

logout$=createEffect(()=>{
  return this.actions$.pipe(
    ofType(autologoutUser),
    map((action)=>{
      this.authService.logoutUser();
      this.router.navigate(['auth'])
    })
  )
},{dispatch:false})

}

