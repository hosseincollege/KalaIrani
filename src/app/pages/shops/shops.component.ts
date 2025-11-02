import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent {
  shops = [
    { id: 1, name: 'فروشگاه ایران کالا', description: 'فروش اجناس ایرانی باکیفیت' },
    { id: 2, name: 'سوپر مارکت وطن', description: 'مواد غذایی ایرانی و ارگانیک' },
    { id: 3, name: 'صنایع دستی اصیل', description: 'صنایع دستی از تمام استان‌ها' }
  ];
}
