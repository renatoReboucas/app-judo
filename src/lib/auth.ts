import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";
import * as schema from "@/db/schema";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "users",
    additionalFields: {
      sobrenome: { type: "string", fieldName: "sobrenome", required: false },
      telefone: { type: "string", fieldName: "telefone", required: false },
      dataNascimento: {
        type: "date",
        fieldName: "dataNascimento",
        required: false,
      },
      nomeResponsavel: {
        type: "string",
        fieldName: "nomeResponsavel",
        required: false,
      },
      telefoneResponsavel: {
        type: "string",
        fieldName: "telefoneResponsavel",
        required: false,
      },
      sensei: { type: "boolean", fieldName: "sensei", required: false },
      atleta: { type: "boolean", fieldName: "atleta", required: false },
      faixa: { type: "string", fieldName: "faixa", required: false },
      cpf: { type: "string", fieldName: "cpf", required: false },
      cpfResponsavel: {
        type: "string",
        fieldName: "cpfResponsavel",
        required: false,
      },
      matriculaFederacao: {
        type: "string",
        fieldName: "matriculaFederacao",
        required: false,
      },
      rg: { type: "string", fieldName: "rg", required: false },
      ativo: { type: "boolean", fieldName: "ativo", required: false },
      image: { type: "string", fieldName: "image", required: false },
    },
  },
});
