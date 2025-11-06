import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomePage {
  constructor(private router: Router) {}

  goToShops() {
    this.router.navigate(['/shops']);
  }

  goToAccount() {
    this.router.navigate(['/account']);
  }

  goToCreateShop() {
    this.router.navigate(['/create-shop']);
  }
}
