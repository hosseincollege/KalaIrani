// File: src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ✅ اضافه شد
import { Router } from '@angular/router'; // ✅ اضافه شد
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment'; // ✅ اضافه شد

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth'; // ✅ اضافه شد
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {} // ✅ HttpClient و Router تزریق شدند

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  // ✅ متد مورد نیاز برای ShopDetail و Account Page
  getUsername(): string | null { // نوع بازگشتی اصلاح شد
    return localStorage.getItem('username');
  }

  // ✅ متد ثبت‌نام برای ارتباط با بک‌اند
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  // ✅ متد ورود برای ارتباط با بک‌اند
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // ✅ متد ذخیره نشست (Session)
  storeSession(username: string, token: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']); // ✅ هدایت پس از خروج اضافه شد
  }
}
