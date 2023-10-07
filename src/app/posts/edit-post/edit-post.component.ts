import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { getPostById} from '../state/post.selectors';
import { Post } from 'src/app/store/models/posts.model';
import { __classPrivateFieldGet } from 'tslib';
import { updatePost } from '../state/post.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  edit_Id!: string;


  constructor(private store: Store<AppState>, private router: ActivatedRoute, private route: Router) { }

  edit_post!: Post
  postSubscription!: Subscription
  updatePostForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  ngOnInit() {
    this.postSubscription = this.store.select(getPostById).subscribe((post: any) => {
      if (post) {
        this.updatePostForm.patchValue({
          title: post.title,
          description: post.description
        })
        this.edit_Id = post.id
      }

    })

  }

  get post() {
    return this.updatePostForm.controls;
  }

  onUpdatePost() {
    if (this.updatePostForm.valid) {

      const title = this.updatePostForm.value.title ?? ''
      const description = this.updatePostForm.value.description ?? ''

      const post: Post = {
        id: this.edit_Id,
        title,
        description
      }

      // update-Dispatch function
      this.store.dispatch(updatePost({ post }))
    }
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe()
    }
  }
}
