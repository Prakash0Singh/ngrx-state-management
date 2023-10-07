import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/state/app.state';
import { Post } from 'src/app/store/models/posts.model';
import { getPosts } from '../state/post.selectors';
import { deletePost, loadPost } from '../state/post.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts$!:Observable<Post[]>

  constructor(private store:Store<AppState>) {}

  ngOnInit(): void {
   this.posts$=this.store.select(getPosts)
   this.store.dispatch(loadPost())
  }

  onDeletePost(deletUser?:string){
    const id=deletUser??''
    this.store.dispatch(deletePost({id}))
  }

}
