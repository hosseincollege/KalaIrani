import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-details',
  standalone: true,
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent {
  shopId: string | null = null;
  constructor(private route: ActivatedRoute) {
    this.shopId = this.route.snapshot.paramMap.get('id');
  }
}
