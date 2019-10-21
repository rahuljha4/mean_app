import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component ({
  selector: 'app-post-list ',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First post', content: 'This first post\'s content' },
  //   { title: 'Second post', content: 'This second post\'s content' },
  //   { title: 'Third post', content: 'This third post\'s content' }
  // ];

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postService: PostService) {  }

  ngOnInit() {
    this.posts = this.postService.getPosts();

    this.postsSub =  this.postService.getPostsUpdateListner().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
   }

   ngOnDestroy() {
     this.postsSub.unsubscribe();
   }
}
