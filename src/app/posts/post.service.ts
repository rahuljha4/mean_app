import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post []>();

  constructor(private http: HttpClient) {}

  getPosts() {
    // return [...this.posts];
    this.http
    .get<{message: string, posts: any}>(
      'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((tranformedPosts) => {
      this.posts = tranformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPost(id: string) {
    // return {...this.posts.find(p => p.id === id)};
    return this.http.get<{_id: string, title: string, content: string}>(
      'http://localhost:3000/api/posts/' + id
    );
  }

  getPostsUpdateListner() {
     return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        const newPostId = responseData.postId;
        post.id = newPostId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {id, title, content};
    this.http.put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletepost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      console.log('Post Deleted');
      const updatedPosts = this.posts.filter(post => postId !== post.id);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
