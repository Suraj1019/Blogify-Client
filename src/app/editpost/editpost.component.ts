import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostdataService } from '../services/postdata.service';
import { ToastrService } from 'ngx-toastr';
import { backend_url } from '../../../src/constant';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css'],
})
export class EditpostComponent {
  postForm: FormGroup = new FormGroup({});
  media: any[] = [];
  imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
  postData: any;
  loader: boolean = false;
  backend_url = backend_url;

  constructor(
    private fb: FormBuilder,
    private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      categories: ['', [Validators.required, this.validateCategories]],
      tags: ['', [Validators.required, this.validateTags]],
      publishDate: ['', Validators.required],
      file: [null],
    });

    this.route.params.subscribe((param) => {
      this.loader = true;
      this.postService.getPostByPostId(param['id']).subscribe(
        (res) => {
          this.loader = false;
          this.postData = res;
          this.media = this.postData?.media;
          if (this.postData) {
            this.media = this.postData.media || [];
            this.postForm.patchValue({
              title: this.postData.title,
              content: this.postData.content,
              categories: this.postData.categories.join(','),
              tags: this.postData.tags.join(','),
            });
          }
          if (this.postData.publishDate) {
            this.postForm.patchValue({
              publishDate: new Date(this.postData.publishDate)
                .toISOString()
                .split('T')[0],
            });
          }
        },
        (err) => {
          this.loader = false;
          this.toastr.error(err.error.message || 'An error occurred.');
        }
      );
    });
  }

  ifImage(url: string) {
    let s = url.split('.');
    if (this.imageExtensions.includes(s[s.length - 1])) return true;
    else return false;
  }

  validateCategories(c: FormControl) {
    let length = c.value.split(',').length;
    return length > 5 ? { categoriesError: {} } : null;
  }

  validateTags(c: FormControl) {
    let length = c.value.split(',').length;
    return length > 10 ? { tagsError: {} } : null;
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.loader = true;
    this.postService.uploadFile(formData).subscribe(
      (response) => {
        this.loader = false;
        this.media.push(response.file);
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    );
  }

  removeFile(filename: any) {
    this.media = this.media.filter((media) => media !== filename);
  }

  // Submit the form data to the server
  onSubmit(type: string): void {
    if (this.postForm.invalid) {
      return;
    }
    let formdata = this.postForm.value;

    const body = {
      _id: this.postData._id,
      title: formdata.title,
      content: formdata.content,
      categories: formdata.categories.split(','),
      publishDate: formdata.publishDate,
      tags: formdata.tags.split(','),
      media: this.media,
      draft: type === 'publish' ? false : true,
    };

    this.loader = true;
    this.postService.editPost(body).subscribe(
      (response) => {
        this.loader = false;
        this.router.navigate(['/profile']);
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    );
  }
}
