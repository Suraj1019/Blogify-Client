import { Component } from '@angular/core';
import { PostdataService } from '../services/postdata.service';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { backend_url } from '../../../src/constant';

@Component({
  selector: 'app-previewpost',
  templateUrl: './previewpost.component.html',
  styleUrls: ['./previewpost.component.css'],
})
export class PreviewpostComponent {
  constructor(
    private postDataServce: PostdataService,
    private router: Router,
    private postService: PostsService,
    private toastr: ToastrService
  ) {}
  postData: any;
  imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
  loader: boolean = false;
  backend_url = backend_url;

  ngOnInit() {
    this.postData = this.postDataServce.getData();
  }

  goBack() {
    this.router.navigate(['/newpost']);
  }

  ifImage(url: string) {
    let s = url.split('.');
    if (this.imageExtensions.includes(s[s.length - 1])) return true;
    else return false;
  }

  publish(type: string) {
    let user = localStorage.getItem('user');
    let userdata = user ? JSON.parse(user) : {};

    this.postData.authorName = userdata.name;
    this.postData.authorId = userdata.userId;

    this.postData.draft = type === 'publish' ? false : true;
    if (type === 'publish') this.postData.publishDate = new Date();

    this.loader = false;
    this.postService.publish(this.postData).subscribe(
      (res) => {
        this.loader = false;
        this.postData = this.postDataServce.clearData();
        this.router.navigate(['/home']);
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    );
  }
}
