import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { backend_url } from '../../../src/constant';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(
    private postService: PostsService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  user: any = null;
  posts: any[] = [];
  showPopup: boolean = false;
  id: any = null;
  imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  loader: boolean = false;
  backend_url = backend_url;

  ngOnInit() {
    let userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
    this.user.name = this.user.name.split(' ')[0];
    this.fetchPosts();
  }

  fetchPosts() {
    this.loader = true;
    this.postService.getPostByUserId(this.user?.userId).subscribe(
      (res) => {
        this.posts = res;
        this.loader = false;
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    );
  }

  onDelete(postId: string) {
    this.showPopup = true;
    this.id = postId;
  }

  setPopup($event: boolean) {
    this.showPopup = $event;
    this.fetchPosts();
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['/home']);
  }

  viewAnalytics() {
    this.router.navigate(['/analytics']);
  }

  viewNotification() {
    this.router.navigate(['/notifications']);
  }

  thumbnail(media: any) {
    for (let url of media) {
      let s = url.split('.');

      if (this.imageExtensions.includes(s[s.length - 1])) return url;
    }
  }
}
