import { prisma } from "@/db/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const dados = {
		email: "joao.silva@email.com",
		senha: "senha123",
		nome: "João",
		sobrenome: "Silva",
		telefone: "(11) 98765-4321",
		dataNascimento: "2000-05-15T00:00:00.000Z",
		nomeResponsavel: "Maria Silva",
		telefoneResponsavel: "(11) 99876-5432",
		sensei: false,
		atleta: true,
		faixa: "branca",
		ativo: true,
	};
	const user = await prisma.user.create({
		data: dados,
	});
	return NextResponse.json(user, { status: 200 });
}

export async function POST(request: NextRequest) {
	const data = await request.json();
	return NextResponse.json({ received: data }, { status: 200 });
}
