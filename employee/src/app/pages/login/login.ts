import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { Authemployee } from '../../service/authemployee';
import { NgIf } from '@angular/common';
import { Authservice } from '../../service/authservice';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: Authservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        console.log('API Response:', res);

        if (res && (res.result || res.Result)) {
          alert('Login Success ✅');
          localStorage.setItem('devuser', JSON.stringify(res.data || res.Data));
          this.router.navigateByUrl('/layout');
        } else {
          alert(res.message || res.Message || 'Login failed ❌');
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('API Error:', err);
        alert(err.error?.message || 'Login failed ❌ (Unauthorized)');
      }
    });
  }
}

