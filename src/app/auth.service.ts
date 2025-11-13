// File: src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ✅ HttpClient اضافه شد
import { Router } from '@angular/router'; // ✅ Router اضافه شد
import { BehaviorSubject, Observable } from 'rxjs'; // ✅ Observable اضافه شد
import { environment } from '../environments/environment'; // ✅ environment اضافه شد

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {} // ✅ وابستگی‌های HTTP و Router

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  // ✅ متد REGISTER: یک Observable برمی‌گرداند
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  // ✅ متد LOGIN: یک Observable برمی‌گرداند (خطای subscribe را برطرف می‌کند)
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  storeSession(username: string, token: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/']); // هدایت به صفحه اصلی پس از خروج
  }
}
