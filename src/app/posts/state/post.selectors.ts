import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./post.state";
import { getCurrrentRoute } from "src/app/store/router/router.selector";
import { RouterStateUrl } from "src/app/store/router/custom.serializer";

const getPostsState=createFeatureSelector<PostsState>('posts')

export const getPosts=createSelector(getPostsState,(state)=>{
    return state.posts
})

export const getPostById=createSelector(getPosts,getCurrrentRoute,(posts,route:RouterStateUrl)=>{
    return posts.find((post)=>{ return post.id===route.params['id']})
})

export const selectCustomer = (id: string) =>
  createSelector(getPosts,getCurrrentRoute, (post,route:RouterStateUrl) => post.find((data:any)=>{return data.id==route.params['id']}));