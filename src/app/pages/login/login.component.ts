import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';
  isError = false;

  constructor(private router: Router) {}

  login() {
    const storedUser = localStorage.getItem('registeredUser');
    if (!storedUser) {
      this.message = '❌ هیچ کاربری ثبت نشده است';
      this.isError = true;
      return;
    }

    const user = JSON.parse(storedUser);

    if (this.username === user.username && this.password === user.password) {
      this.message = '✅ ورود موفقیت‌آمیز بود';
      this.isError = false;
      setTimeout(() => this.router.navigate(['/home']), 1500);
    } else {
      this.message = '❌ نام کاربری یا رمز عبور اشتباه است';
      this.isError = true;
    }
  }
}
