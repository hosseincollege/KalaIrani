export const environment = (() => {
  const hostname =
    typeof window !== 'undefined' ? window.location.hostname : '';

  // تشخیص لوکال (فقط localhost، 127 یا IP داخلی)
  const isLocal =
    hostname === 'localhost' ||
    hostname.startsWith('127.') ||
    hostname.startsWith('192.168.');

  if (isLocal) {
    return {
      production: false,
      apiUrl: 'http://localhost:3000', // بک‌اند لوکال
    };
  }

  // اگر روی سرورهای ابری (Vercel یا هر دامنه‌ای غیر از لوکال)
  return {
    production: true,
    apiUrl: 'https://kala-irani-api.onrender.com', // بک‌اند روی Render
  };
})();
