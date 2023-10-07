import { Injectable } from "@angular/core";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "src/app/service/post.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPost, loadPostSuccess, updatePost, updatePostSuccess } from "./post.actions";
import { filter, map, mergeMap, switchMap, tap } from "rxjs";
import { AppState } from "src/app/store/state/app.state";
import { Store } from "@ngrx/store";
import { setErrorMessage } from "src/app/store/Shared/shared.actions";
import { Router } from "@angular/router";
import { ROUTER_NAVIGATION, RouterNavigatedAction, RouterNavigationAction } from "@ngrx/router-store";
import { Post } from "src/app/store/models/posts.model";
import { Update } from "@ngrx/entity";

@Injectable()

export class PostEffect{
    constructor(private actions$:Actions,private postService:PostService,private store:Store<AppState>,private router:Router) {}

    loadPosts$=createEffect(()=>{
        return this.actions$.pipe(ofType(loadPost),
        mergeMap((action)=>{
            return this.postService.getPostData().pipe(
                map((post:any)=>{
                    return loadPostSuccess({post})
                }
            ))
        })
        )
    })

    addPost$=createEffect(()=>{
        return this.actions$.pipe(ofType(addPost),mergeMap((action)=>{
            return this.postService.addPost(action.post).pipe(map((data:any)=>{
                const post={...action.post,id:data.name}
                return addPostSuccess({post})
            }))
        }))
    })

    updatePost$=createEffect(()=>{
        return this.actions$.pipe(ofType(updatePost),
        switchMap((action)=>{
            return this.postService.updatePost(action.post).pipe(
                map((post:any)=>{
                const updatedPost:Update<Post>={
                    id:action.post.id,
                    changes:{
                        ...action.post
                    }
                }
                return updatePostSuccess({post:action.post})
            }))
        }))
    })
    deletePost$=createEffect(()=>{
        return this.actions$.pipe(ofType(deletePost),
        switchMap((action)=>{
            return this.postService.deletePost(action.id).pipe(map((post:any)=>{
                return deletePostSuccess({id:action.id})
            }))
        }))
    })

    onRedirect$=createEffect(()=>{

        return this.actions$.pipe(ofType(...[updatePostSuccess,addPostSuccess]),
        tap((action)=>{
          this.store.dispatch(setErrorMessage({message:''}))
            this.router.navigate(['/posts'])
 
        }))
      },{dispatch:false})

      getSinglePost$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(ROUTER_NAVIGATION),
          filter((r: RouterNavigatedAction) => {
            return r.payload.routerState.url.startsWith('/posts/details');
          }),
          map((r: any) => {
            return r.payload.routerState['params']['id'];
          }),
          switchMap((id) => {
            return this.postService.getPostbyId(id).pipe(
              map((post) => {
                const postData = [{ ...post, id }];
                return loadPostSuccess({ post: postData });
              })
            );
          })
        );
      });
    
}
