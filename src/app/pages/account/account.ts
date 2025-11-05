import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../app/auth.service';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account.html'
})
export class AccountPage {
  user: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUser();
  }
}
