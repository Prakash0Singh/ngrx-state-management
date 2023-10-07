import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/store/models/posts.model';
import { AppState } from 'src/app/store/state/app.state';
import { getPostById } from '../state/post.selectors';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  post!:Observable<any>
 constructor(private store:Store<AppState>) {}

 ngOnInit(){
  this.post=this.store.select(getPostById)
 }
}
