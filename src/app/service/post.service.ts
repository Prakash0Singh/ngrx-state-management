import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../store/models/posts.model';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  url='https://ngrx-angualr-default-rtdb.firebaseio.com/'
  getPostData():Observable<Post[]>{
    return this.http.get(`${this.url}post.json`).pipe(map((data:any)=>{
      const post:Post[]=[]
      for (let key in data) {
        post.push({ ...data[key], id: key });
      }
      return post
    }))
  }

  addPost(post:Post):Observable<{name:string}>{
    return this.http.post<{name:string}>(`${this.url}/post.json`,post)
  }

  updatePost(post:Post){
    const postData={[post.id]:{title:post.title,description:post.description}}
    return this.http.patch(`${this.url}/post.json`,postData)
  }

  deletePost(id:string){
    return this.http.delete(`${this.url}/post/${id}.json`)
  }

  
  getPostbyId(id:string):Observable<Post>{
    return this.http.get<Post>(`${this.url}/post/${id}.json`)
  }
}
