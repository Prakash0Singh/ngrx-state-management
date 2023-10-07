import { createReducer, on } from "@ngrx/store"
import { initialState } from "../state/counter.state"
import { changeMessage, customIncrement, decrement, increment, reset } from "./counter.action"

const _counterReducer=createReducer(initialState,
        on(increment,(state)=>{
            return {
                ...state,
                counter:state.counter+1
            }
        }),
        on(decrement,(state)=>{
            return{
                ...state,
                counter:state.counter-1
            }
        }),
        on(reset,(state)=>{
            return{
                ...state,
                counter:0
            }
        }),
        on(customIncrement,(state,action)=>{
            console.log(action)
            return{
                ...state,
                counter:state.counter+action.value
            }
        }),
        on(changeMessage,(state)=>{
            return{
                ...state,
                message:"Modified Message"
            }
        })
    ) 
  
  export function counterReducer(state:any,action:any){
    return _counterReducer(state,action)
  }