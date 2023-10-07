import { Post } from "src/app/store/models/posts.model"

export interface PostsState{
    posts:Post[]
}

export const initialState:PostsState={
    posts:[]
 
}