import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPost = [];

  onPostAdded(post: any) {
    this.storedPost.push(post);
  }
}
