import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Recupera o cookie
  const token = request.cookies.get('@Auth:token')

  // Rota pública de login
  if (request.nextUrl.pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/home', request.url))
    }
    return NextResponse.next()
  }

  // Verifica se não tem token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Configurar quais rotas o middleware deve proteger
export const config = {
  matcher: ['/auth/:path*', '/api/:path*'],
}
