import { createAction, props } from "@ngrx/store"
import { User } from "src/app/store/models/usermodel"

export const LOGIN_START='Login Start'
export const LOGIN_SUCCESS='Login Success'
export const LOGIN_FAIL='Login Fail'

export const SIGN_START='New User'
export const SIGN_SUCCESS='User Created Successfully'

export const AUTO_Login='Auto Login User'
export const LOGOUT_USER='Logout User'

export const loginStart=createAction(LOGIN_START,props<{email:string,password:string}>())

export const loginSuccess=createAction(LOGIN_SUCCESS,props<{user:User | null,redirect:boolean}>())

export const loginFail=createAction(LOGIN_FAIL)

export const signupStart=createAction(SIGN_START,props<{email:string,password:string}>())

export const signupSuccess=createAction(SIGN_SUCCESS,props<{user:User,redirect:boolean}>())

export const autoUserLogin=createAction(AUTO_Login)

export const autologoutUser=createAction(LOGOUT_USER)