import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
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
<<<<<<< HEAD
    this.auth.isLoggedIn$.subscribe((state: boolean) => this.isLoggedIn = state);
=======
    this.auth.isLoggedIn$.subscribe(state => this.isLoggedIn = state);
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
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
