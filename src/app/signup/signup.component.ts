import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private fb: FormBuilder, private auhtService: AuthService, private router: Router, private toastr: ToastrService) { }
  signupForm: FormGroup = new FormGroup({});
  loader: boolean = false;

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}")]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, this.matchPassword]]
    })
  }

  matchPassword() {

  }



  signup() {
    const { name, email, password } = this.signupForm.value
    this.loader = true;
    this.auhtService.signup({ name, email, password }).subscribe(
      value => {
        this.loader = false;
        this.toastr.success('Registered! Log in now.')
        this.router.navigate(['/login'])
      },
      error => {
        this.loader = false;
        this.toastr.error(error.error.message || 'An error occurred.');
      }
    )
  }
}
