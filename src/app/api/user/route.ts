import { prisma } from '@/db/prisma'
import { criptografarSenha } from '@/utils/passwordUtils'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const dados = await prisma.user.findMany()
  return NextResponse.json(dados, { status: 200 })
}

export async function POST(request: Request) {
  const dados = await request.json()
  const validUser = await prisma.user.findFirst({
    where: { email: dados.email },
  })
  if (!validUser) {
    const user = await prisma.user.create({
      data: { ...dados, senha: await criptografarSenha(dados.senha) },
    })
    return NextResponse.json(user, { status: 200 })
  }
  return NextResponse.json(
    { error: true, msg: 'Usuário já cadastrado' },
    { status: 400 }
  )
}
