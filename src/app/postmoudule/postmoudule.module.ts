import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostmouduleRoutingModule } from './postmoudule-routing.module';
import { AddPostComponent } from '../posts/add-post/add-post.component';
import { EditPostComponent } from '../posts/edit-post/edit-post.component';
import { PostsListComponent } from '../posts/posts-list/posts-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from '../posts/state/post.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PostEffect } from '../posts/state/post.effect';


@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('posts',postsReducer),
    EffectsModule.forFeature([PostEffect]),
    ReactiveFormsModule,
    FormsModule,
    PostmouduleRoutingModule
  ],
})
export class PostmouduleModule { }
