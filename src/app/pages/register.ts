// File: src/app/pages/register.ts ✅ نسخه‌ی متصل به بک‌اند واقعی
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterPage {
  username = '';
  email = '';
  password = '';
  message = '';
  isError = false;
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  register() {
    if (!this.username || !this.email || !this.password) {
      this.message = '❌ لطفاً همه فیلدها را پر کنید';
      this.isError = true;
      return;
    }

    this.loading = true;
    this.authService
      .register(this.username, this.email, this.password)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.message = res.message || '✅ ثبت‌نام با موفقیت انجام شد';
          this.isError = false;

          // بعد از ۱.۵ ثانیه هدایت به صفحه لاگین
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          this.loading = false;
          this.isError = true;
          this.message =
            err.error?.message || '❌ مشکلی در ثبت‌نام رخ داد.';
        }
      });
  }
}
