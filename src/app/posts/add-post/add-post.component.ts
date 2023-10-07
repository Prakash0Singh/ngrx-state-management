import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/store/models/posts.model';
import { AppState } from 'src/app/store/state/app.state';
import { addPost } from '../state/post.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(private store:Store<AppState>,private route:Router){}

  addPostForm!:FormGroup

  ngOnInit(): void {
    this.addPostForm=new FormGroup({
      title:new FormControl('',[Validators.required,Validators.minLength(6)]),
      description:new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  onAddPost(){
    if (this.addPostForm.valid) {
      console.log(this.addPostForm.value)
      
      const post:Post={
        title:this.addPostForm.value.title,
        description:this.addPostForm.value.description
      }

      this.store.dispatch(addPost({post}))

    }
  }
  
  get post(){
    return this.addPostForm.controls;
  }


}
