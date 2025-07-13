import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  constructor(private postService: PostsService, private toastr: ToastrService) { }
  comments: any = [];
  user = localStorage.getItem('user');
  userdata = this.user ? JSON.parse(this.user) : {};
  loader: boolean = false;

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.loader = true;
    this.postService.getComments(this.userdata.userId).subscribe(
      res => {
        this.loader = false;
        this.comments = res;
      },
      err => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    )
  }

  action(actionType: string, postId: string, commentId: string) {
    const body = {
      postId: postId,
      commentId: commentId,
      status: actionType === 'approve' ? 'approved' : 'rejected'
    }

    this.loader = true;
    this.postService.approveComment(body).subscribe(
      res => {
        this.loader = false;
        this.toastr.success('Action taken')
        this.getComments()
      },
      err => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    )

  }


}
