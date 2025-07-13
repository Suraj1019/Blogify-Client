import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { PostdataService } from '../services/postdata.service';
import { ToastrService } from 'ngx-toastr';
import { backend_url } from '../../../src/constant';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css'],
})
export class NewpostComponent {
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
    private postdataService: PostdataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(backend_url, 'form const');
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      categories: ['', [Validators.required, this.validateCategories]],
      tags: ['', [Validators.required, this.validateTags]],
      file: [null],
    });

    this.postData = this.postdataService.getData();
    if (this.postData) {
      this.media = this.postData.media || [];
      this.postForm.patchValue({
        title: this.postData.title,
        content: this.postData.content,
        categories: this.postData.categories.join(','),
        tags: this.postData.tags.join(','),
      });
    }
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
        this.media.push(response.url);
        this.loader = false;
      },
      (err) => {
        this.loader = false;
        this.toastr.error(err.error.message || 'An error occurred.');
      }
    );
  }

  ifImage(url: string) {
    let s = url.split('.');
    if (this.imageExtensions.includes(s[s.length - 1])) return true;
    else return false;
  }

  removeFile(filename: any) {
    this.media = this.media.filter((media) => {
      return media !== filename;
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }
    let formdata = this.postForm.value;

    const postData = {
      title: formdata.title,
      content: formdata.content,
      categories: formdata.categories.split(','),
      tags: formdata.tags.split(','),
      media: this.media,
    };

    this.postdataService.setData(postData);
    this.router.navigate(['/previewpost']);
  }
}
