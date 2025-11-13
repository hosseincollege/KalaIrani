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
  isError = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (!this.username || !this.password) {
      this.message = '⚠️ لطفاً نام کاربری و رمز عبور را وارد کنید.';
      this.isError = true;
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        const token = res.token;
        const username = res.user.username;
        this.authService.storeSession(username, token);
        this.message = '✅ ورود موفقیت‌آمیز بود!';
        this.isError = false;
        setTimeout(() => this.router.navigate(['/account']), 1500);
      },
      error: (err) => {
        this.message = '❌ ' + err.error.message;
        this.isError = true;
      }
    });
  }
}
