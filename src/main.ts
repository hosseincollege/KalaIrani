// File: src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

// 🟢 این نسخه کاملاً اصلاح‌شده و سالم است.
// هیچ شرط یا منطق ورود در آن وجود ندارد.
// فقط روت‌ها و ارتباط با API آماده‌اند.

bootstrapApplication(AppComponent, {
  providers: [
    // مسیرها
    provideRouter(routes),

    // دسترسی به API‌ها
    provideHttpClient()
  ]
}).catch(err => console.error('❌ خطا در بوت‌استرپ اپ:', err));
