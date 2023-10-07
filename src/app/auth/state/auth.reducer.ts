import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginSuccess, autologoutUser, signupSuccess } from "./auth.actions";

const _authReducer=createReducer(initialState,
    on(loginSuccess,(state,action)=>{
           
            return{
                ...state,
                user:action.user
            }
}),
on(signupSuccess,(state,action)=>{

    return{
        ...state,
        user:action.user
    }
}),
on(autologoutUser,(state)=>{
    return{
        ...state,
        user:null,
    }
})
)

export function AuthReducer(state:any,actions:any){
    return _authReducer(state,actions)
}