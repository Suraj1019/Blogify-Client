import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private PostsService: PostsService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.onSearch = _.debounce(this.onSearch, 700);
  }
  posts: any[] = [];
  selectedCatgory: string = '';
  search: string = '';
  imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  loader: boolean = false;

  ngOnInit(): void {
    this.getPosts();
  }

  ifImage(url: string) {
    let s = url.split('.');
    if (this.imageExtensions.includes(s[s.length - 1])) return true;
    else return false;
  }

  getPosts() {
    this.loader = true;
    this.PostsService.getPosts(this.search).subscribe(
      (value) => {
        this.posts = value;
        this.loader = false;
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    );
  }

  viewPost(postId: string) {
    this.router.navigate(['/post', postId]);
  }

  newpost() {
    this.router.navigate(['/newpost']);
  }

  onSearch() {
    this.getPosts();
  }

  thumbnail(media: any) {
    for (let url of media) {
      let s = url.split('.');
      if (this.imageExtensions.includes(s[s.length - 1])) return url;
    }
  }
}
