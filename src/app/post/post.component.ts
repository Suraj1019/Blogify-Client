import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { backend_url } from '../../../src/constant';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}
  postData: any = null;
  imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
  loader: boolean = false;
  postId = null;
  comments: any = [];
  commentForm: FormGroup = new FormGroup({});
  replyForm: FormGroup = new FormGroup({});
  user = localStorage.getItem('user');
  userdata = this.user ? JSON.parse(this.user) : {};
  backend_url = backend_url;

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.postId = param['id'];
      this.getPost();
      this.updateViews();

      this.commentForm = this.fb.group({
        comment: ['', Validators.required],
      });

      this.replyForm = this.fb.group({
        reply: ['', Validators.required],
      });
    });
  }

  ifImage(url: string) {
    let s = url.split('.');
    if (this.imageExtensions.includes(s[s.length - 1])) return true;
    else return false;
  }

  getPost() {
    if (this.postId) {
      this.loader = false;
      this.postService.getPostByPostId(this.postId).subscribe(
        (res) => {
          this.postData = res;
          this.comments = res.comments.filter((comment: any) => {
            return comment.status === 'approved';
          });
          this.loader = false;
        },
        (err) => {
          this.loader = false;
          this.toastr.error(err.error.message || 'An error occurred.');
        }
      );
    }
  }

  updateViews() {
    if (this.postId) {
      this.loader = false;
      this.postService
        .updateViews({ postId: this.postId, visitor: this.userdata.userId })
        .subscribe(
          (res) => {
            this.loader = false;
          },
          (err) => {
            this.loader = false;
            this.toastr.error(err.error.message || 'An error occurred.');
          }
        );
    }
  }

  comment() {
    let formData = this.commentForm.value;
    const body = {
      message: formData.comment,
      postId: this.postData._id,
      userId: this.userdata.userId,
      userName: this.userdata.name,
    };
    this.loader = false;
    this.postService.comment(body).subscribe(
      (res) => {
        this.loader = false;
        this.commentForm.reset();
        this.toastr.success('Comment will approve soon!');
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    );
  }

  reply(commentId: string) {
    let formData = this.replyForm.value;
    const body = {
      message: formData.reply,
      postId: this.postData._id,
      commentId: commentId,
    };
    this.loader = false;
    this.postService.reply(body).subscribe(
      (res) => {
        this.loader = false;
        this.toastr.success('Reply added!');
        this.replyForm.reset();
        this.getPost();
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    );
  }

  delete(commentId: string) {
    const body = {
      postId: this.postData._id,
      commentId: commentId,
    };
    this.loader = false;
    this.postService.deleteComment(body).subscribe(
      (res) => {
        this.loader = false;
        this.getPost();
        this.toastr.success('Comment deleted successfully!');
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    );
  }
}
