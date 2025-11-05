import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html'
})
export class ProductsPage {
  shopId: number = 0;
  products: any[] = [];
  productName = '';
  productPrice = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.shopId = Number(this.route.snapshot.paramMap.get('id'));
    const allProducts = JSON.parse(localStorage.getItem('products') || '{}');
    this.products = allProducts[this.shopId] || [];
  }

  addProduct() {
    if (!this.productName || !this.productPrice) return;

    const newProduct = { name: this.productName, price: this.productPrice };
    const allProducts = JSON.parse(localStorage.getItem('products') || '{}');

    if (!Array.isArray(allProducts[this.shopId])) allProducts[this.shopId] = [];
    allProducts[this.shopId].push(newProduct);

    localStorage.setItem('products', JSON.stringify(allProducts));

    this.productName = '';
    this.productPrice = '';
    this.products = allProducts[this.shopId];
  }

  deleteProduct(p: any) {
    const allProducts = JSON.parse(localStorage.getItem('products') || '{}');
    allProducts[this.shopId] = allProducts[this.shopId].filter(
      (prod: any) => prod.name !== p.name
    );
    localStorage.setItem('products', JSON.stringify(allProducts));
    this.products = allProducts[this.shopId];
  }
}
