import { prisma } from '@/db/prisma'
import { compararSenha } from '@/utils/passwordUtils'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  })
  if (!user) {
    return NextResponse.json({ msg: 'Usuário não encontrado' }, { status: 404 })
  }
  const compar = await compararSenha(data.senha, user.senha)
  if (!compar) {
    return NextResponse.json({ msg: 'Senha incorreta' }, { status: 401 })
  }
  if (!user.ativo) {
    return NextResponse.json({ msg: 'Usuário inativo' }, { status: 401 })
  }
  const response = NextResponse.json(
    { msg: 'Login realizado com sucesso' },
    { status: 200 }
  )
  response.cookies.set({
    name: '@Auth:token',
    value: JSON.stringify(user),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
  })

  return response

  // return NextResponse.json(
  //   { error: true, msg: 'Usuário já cadastrado' },
  //   { status: 400 }
  // )
}
