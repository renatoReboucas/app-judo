// route.ts
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      email,
      password,
      name,
      sobrenome,
      matricula,
      telefone,
      dataNascimento,
      nomeResponsavel,
      telefoneResponsavel,
      faixa,
    } = await req.json();

    const senhaHash = await hash(password, 12);

    const usuario = await prisma.user.create({
      data: {
        email,
        password: senhaHash,
        name,
        sobrenome,
        matricula,
        telefone,
        dataNascimento: new Date(dataNascimento),
        nomeResponsavel,
        telefoneResponsavel,
        faixa,
        atleta: true,
        isActive: true,
      },
    });

    return new Response(JSON.stringify(usuario), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao criar usuário" }), {
      status: 500,
    });
  }
}
