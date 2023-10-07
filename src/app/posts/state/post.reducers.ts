import { createReducer, on } from "@ngrx/store"
import { initialState } from "./post.state"
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPostSuccess, updatePost, updatePostSuccess } from "./post.actions"

const _postsReducer=createReducer(initialState,
    on(addPostSuccess,(state,action)=>{
        let post={...action.post}
        return{
            ...state,
            posts:[...state.posts,post]
        }
    }),
    on(updatePostSuccess,(state,action)=>{
        const updatedPost=state.posts.map((post)=>{
            return action.post.id==post.id ? action.post:post
        })
        return {
            ...state,
            posts:updatedPost
        }
    }),
    on(deletePostSuccess,(state,{id})=>{
        const removePost=state.posts.filter(post=>{return post.id!==id})
        return{
            ...state,
            posts:removePost
        }
    }),
    on(loadPostSuccess,(state,action)=>{
        console.log(action.post)
        return {
            ...state,
            posts:action.post,
        }
    }),

    )

export function postsReducer(state:any,action:any){
    return _postsReducer(state,action)
}