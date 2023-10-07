import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { loginStart } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store:Store<AppState>) {}

  loginForm :any=new FormGroup({
    userid: new FormControl ('',Validators.required),
    userpass:new FormControl ('',Validators.required)
  })

  ngOnInit(): void {
    
  }

  get log(){
    return this.loginForm.controls;
  }

  onUserlogin(){
    if (this.loginForm.valid) {
      const email=this.loginForm.value.userid
      const password=this.loginForm.value.userpass
      this.store.dispatch(setLoadingSpinner({status:true}))
      this.store.dispatch(loginStart({email,password}))
    }
    else{
      console.error('Please fill form properly')
    }
    
  }

}
