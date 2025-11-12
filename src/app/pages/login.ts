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
  loading = false;

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    if (!this.username || !this.password) {
      this.message = '⚠️ لطفاً نام کاربری و رمز عبور را وارد کنید.';
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
  }
}
