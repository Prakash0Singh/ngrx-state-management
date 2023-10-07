import { User } from "src/app/store/models/usermodel"

export interface AuthState{
    user:User|null
}

export const initialState:AuthState={
    user:null
}