   import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';

   export interface Product {
     id?: number;
     name: string;
     manufacturer: string;
     description: string;
     price: number;
     imageUrl: string;
   }

   @Injectable({ providedIn: 'root' })
   export class ProductService {
     private apiUrl = 'https://localhost:5001/api/products';

     constructor(private http: HttpClient) {}

     getProducts(): Observable<Product[]> {
       return this.http.get<Product[]>(this.apiUrl);
     }

     createProduct(p: Product): Observable<Product> {
       return this.http.post<Product>(this.apiUrl, p);
     }
   }
