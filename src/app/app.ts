// File: src/app/app.ts
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http'; // ✅ ایمپورت ضروری

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterOutlet, 
    HttpClientModule // ✅ اضافه کردن به لیست ایمپورت‌ها
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  isMenuOpen = false;
  isLoggedIn = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    // 🔹 مشترک شو تا وقتی login/logout انجام شد منو آپدیت بشه
    this.auth.isLoggedIn$.subscribe(state => this.isLoggedIn = state);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.side-menu');
    const menuBtn = document.querySelector('.menu-btn');
    if (this.isMenuOpen && menu && menuBtn && !menu.contains(target) && !menuBtn.contains(target)) {
      this.isMenuOpen = false;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
