import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userKey = 'loggedUser';
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedInInit());
  isLoggedIn$ = this.loggedIn.asObservable();

  private isLoggedInInit(): boolean {
    return localStorage.getItem(this.userKey) !== null;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInInit();
  }

  getUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  login(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.loggedIn.next(true); // 🔹 وضعیت به‌روزرسانی شود
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.loggedIn.next(false); // 🔹 وضعیت ریست شود
  }
}
