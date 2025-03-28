import { NextResponse } from "next/server";

export function middleware(req) {
  // Dapatkan token atau session
  const token = req.cookies.get('connect.sid')?.value || req.cookies.get('token')?.value; // Sesuaikan dengan cookie session Anda
  const path = req.nextUrl.pathname;
  
  // Rute yang memerlukan autentikasi
  const protectedRoutes = ['/dashboard', '/profile', '/admin', '/settings' ,'/hire/designers','/hire'];
  const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  
  // Redirect jika mencoba mengakses rute yang memerlukan autentikasi tanpa login
  if (protectedRoutes.some(route => path.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('./auth/login', req.url));
    }
  }
  
  // Mencegah pengguna yang sudah login mengakses halaman login/register
  if (authRoutes.includes(path)) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // Tambahkan header kustom
  const response = NextResponse.next();
  response.headers.set('x-auth-middleware', 'processed');

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)"
  ],
};