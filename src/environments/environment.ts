export const environment = (() => {
  // بررسی آدرس دامنه فعلی
  const isLocal = typeof window !== 'undefined' &&
                  (window.location.hostname === 'localhost' || 
                   window.location.hostname.startsWith('127.') ||
                   window.location.hostname.includes('192.168'));

  // اگر لوکال هست، به NestJS لوکال متصل شو
  if (isLocal) {
    return {
      production: false,
      apiUrl: 'http://localhost:3000'
    };
  }

  // اگر روی سرور هست، به دامنه NestJS روی Render وصل شو
  return {
    production: true,
    apiUrl: 'https://kala-irani-api.onrender.com'
  };
})();
