import { Component } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
=======
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterPage {
  username = '';
  email = '';
  password = '';
  message = '';
<<<<<<< HEAD
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.username || !this.email || !this.password) {
      this.message = '⚠️ لطفاً همه فیلدها را پر کنید';
      return;
    }

    this.loading = true;
    this.auth.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.message = '✅ ثبت‌نام با موفقیت انجام شد';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.';
        this.loading = false;
      }
    });
=======
  isError = false;

  constructor(private router: Router) {}

  register() {
    if (!this.username || !this.email || !this.password) {
      this.message = '❌ لطفاً همه فیلدها را پر کنید';
      this.isError = true;
      return;
    }

    const newUser = { username: this.username, email: this.email, password: this.password };
    localStorage.setItem('registeredUser', JSON.stringify(newUser));

    this.message = '✅ ثبت‌نام با موفقیت انجام شد';
    this.isError = false;

    setTimeout(() => this.router.navigate(['/login']), 1500);
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  }
}
