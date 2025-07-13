import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auhtService: AuthService, private fb: FormBuilder, private router: Router, private userService: UserService, private toastr: ToastrService) { }
  loginForm: FormGroup = new FormGroup({})
  loader: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}")]],
      password: ['', Validators.required]
    })
  }

  login() {
    this.loader = true;
    this.auhtService.login(this.loginForm.value).subscribe(
      value => {
        this.userService.setUser(value)
        this.toastr.success('Log in success.')
        this.loader = false;
        this.router.navigate(['/home'])
      },
      error => {
        this.toastr.error(error.error.message || 'An error occurred.');
        this.loader = false;
      }
    )
  }

}
