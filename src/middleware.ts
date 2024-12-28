import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  // Cria resposta e cliente Supabase
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  try {
    // Verifica sessão atual
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Se estiver na rota /login
    if (session && url.pathname.startsWith("/login")) {
      const redirectUrl = new URL("/home", request.url);
      const response = NextResponse.redirect(redirectUrl);

      return NextResponse.redirect(new URL("/home", url.origin));
    }

    if (!session && !url.pathname.startsWith("/login"))
      return NextResponse.redirect(new URL("/login", url.origin));

    return res;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/home", "/"],
};
