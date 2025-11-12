import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginPage {
  username = '';
  password = '';
  message = '';
<<<<<<< HEAD
  loading = false;

  constructor(private router: Router, private auth: AuthService) {}
=======
  isError = false;

  constructor(private router: Router, private authService: AuthService) {}
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559

  login() {
    if (!this.username || !this.password) {
      this.message = '⚠️ لطفاً نام کاربری و رمز عبور را وارد کنید.';
<<<<<<< HEAD
      return;
    }

    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        const token = res?.token;
        this.auth.storeSession(this.username, token);
        this.message = '✅ ورود موفقیت‌آمیز بود';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/account']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ نام کاربری یا رمز عبور اشتباه است.';
        this.loading = false;
      }
    });
=======
      this.isError = true;
      return;
    }

    const storedUser = localStorage.getItem('registeredUser');
    if (!storedUser) {
      this.message = '❌ هیچ کاربری در سیستم ثبت نشده است.';
      this.isError = true;
      return;
    }

    const user = JSON.parse(storedUser);

    if (this.username === user.username && this.password === user.password) {
      // ✅ ایجاد توکن ساختگی تا امضای تابع درست بشه
      const fakeToken = 'token_' + Date.now().toString();

      // ✅ اصلاح‌شده: دو پارامتر
      this.authService.login(this.username, fakeToken);

      this.message = '✅ ورود موفقیت‌آمیز بود!';
      this.isError = false;
      setTimeout(() => this.router.navigate(['/account']), 1500);
    } else {
      this.message = '❌ نام کاربری یا رمز عبور اشتباه است.';
      this.isError = true;
    }
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  }
}
