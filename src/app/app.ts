// File: src/app/app.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http'; // ✅ ضروری برای استفاده از HttpClient در سرویس‌ها

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule // ✅ اضافه شد
  ],
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'Kalairani.client';
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // 🔹 اشتراک در وضعیت ورود
    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  // 🔹 متد logout (اگر نیاز به دکمه خروج سراسری باشد)
  logout() {
    this.auth.logout();
  }
}
