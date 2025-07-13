import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, private userService: UserService) { }
  user: any = null;
  userSubscription!: Subscription;

  ngOnInit() {
    this.userSubscription = this.userService.user.subscribe(user => {
      this.user = user;
      this.user.name = this.user.name.split(' ')[0]
    });
  }
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  viewProfile() {
    if (this.user) this.router.navigate(['/profile'])
    else this.router.navigate(['/login'])
  }

}
