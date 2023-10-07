import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { signupStart } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private store:Store<AppState>) {}

  signUpForm:any=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])
  })

  
  get get(){
    return this.signUpForm.controls;
  }


  onsignupForm(){

    if (this.signUpForm.valid){

      const email=this.signUpForm.value.email;
      const password=this.signUpForm.value.password;
      this.store.dispatch(setLoadingSpinner({status:true}))
      this.store.dispatch(signupStart({email,password}))

    }
    
  }
}
