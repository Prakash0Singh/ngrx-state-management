import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/store/models/posts.model";

export const ADD_POST_ACTION='[post page] add post';
export const ADD_POST_SUCCESS='[post page] add post success'
export const LOAD_POST_DATA='[post page] load posts'
export const LOAD_POST_SUCCESSS='[post page] post success'

export const UPDATE_POST='[post page] update post'
export const UPDATE_POST_SUCCESS='[post page] update success'

export const DELETE_POST='[post page] delete post'
export const DELETE_POST_SUCCESS='[post page] delete success'



export const addPost=createAction('addnewpost',props<{post:Post}>())
export const addPostSuccess=createAction(ADD_POST_SUCCESS,props<{post:Post}>())

export const updatePost=createAction(UPDATE_POST,props<{post:Post}>())
export const updatePostSuccess=createAction(UPDATE_POST_SUCCESS,props<{post:Post}>())

export const deletePost=createAction(DELETE_POST,props<{id:string}>())
export const deletePostSuccess=createAction(DELETE_POST_SUCCESS,props<{id:string}>())

export const loadPost=createAction(LOAD_POST_DATA)
export const loadPostSuccess=createAction(LOAD_POST_SUCCESSS,props<{post:Post[]}>())