import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  message = '';
  isError = false;

  constructor(private router: Router) {}

  register() {
    if (!this.username || !this.email || !this.password) {
      this.message = '❌ لطفاً همه فیلدها را پر کنید';
      this.isError = true;
      return;
    }

    // ذخیره کاربر جدید در localStorage
    const newUser = { username: this.username, email: this.email, password: this.password };
    localStorage.setItem('registeredUser', JSON.stringify(newUser));

    this.message = '✅ ثبت‌نام با موفقیت انجام شد';
    this.isError = false;

    // انتقال به صفحه ورود
    setTimeout(() => this.router.navigate(['/login']), 1500);
  }
}
