<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
=======
// File: src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

<<<<<<< HEAD
=======
  // ✅ متد مورد نیاز برای ShopDetail و Account Page
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

<<<<<<< HEAD
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  storeSession(username: string, token: string) {
=======
  login(username: string, token: string) {
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
<<<<<<< HEAD
    this.router.navigate(['/login']);
=======
>>>>>>> 88e9041861669a3a0678de86b04a953c64d33559
  }
}
