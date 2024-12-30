import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // const cookie = req.cookies.get("next-auth.csrf-token")?.value;

  // pega a sessao do usuario para podermos validar
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  // console.log({ session });
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

// configuracao das rotas a serem protegidas
export const config = {
  matcher: ["/home", "/authenticated/:path*"], // Adicione todas as rotas protegidas
};
