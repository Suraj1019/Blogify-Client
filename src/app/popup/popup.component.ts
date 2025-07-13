import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  constructor(private postService: PostsService, private toastr: ToastrService) { }
  @Output() setPopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() id: any;
  loader: boolean = false;

  onCancel() {
    this.setPopup.emit(false);
  }

  onDelete() {
    if (this.id) {
      this.loader = true;
      this.postService.deletePost(this.id).subscribe(
        res => {
          this.loader = false;
          this.setPopup.emit(false)
        },
        err => {
          this.loader = false;
          this.toastr.error(err.error.message || 'An error occurred.');
        }
      )
    }

  }
}
