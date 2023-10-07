import { AUTH_STATE_NAME } from "src/app/auth/state/auth.selectors"
import { SharedReducer } from "../Shared/shared.reducer"
import { SHARED_STATE_NAME } from "../Shared/shared.selectors"
import { SharedState } from "../Shared/shared.state"
import { AuthState } from "src/app/auth/state/auth.state"
import { AuthReducer } from "src/app/auth/state/auth.reducer"
import { RouterReducerState, routerReducer } from "@ngrx/router-store"

export interface AppState{
   [SHARED_STATE_NAME]:SharedState
   [AUTH_STATE_NAME]:AuthState
   router:RouterReducerState
}

export const appReducer={
    [SHARED_STATE_NAME]:SharedReducer,
    [AUTH_STATE_NAME]:AuthReducer,
    router:routerReducer,
}