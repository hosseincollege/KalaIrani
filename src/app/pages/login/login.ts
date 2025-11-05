import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../app/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
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
    const storedUser = localStorage.getItem('registeredUser');
    if (!storedUser) {
      this.message = '❌ هیچ کاربری ثبت نشده است';
      this.isError = true;
      return;
    }

    const user = JSON.parse(storedUser);

    if (this.username === user.username && this.password === user.password) {
      this.authService.login(user);
      this.message = '✅ ورود موفقیت‌آمیز بود';
      this.isError = false;
      setTimeout(() => this.router.navigate(['/account']), 1500);
    } else {
      this.message = '❌ نام کاربری یا رمز عبور اشتباه است';
      this.isError = true;
    }
  }
}
