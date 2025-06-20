import { z } from "zod";

const upsertUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .optional(),
  telefone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine((value) => {
      // Remove todos os caracteres não numéricos para contar apenas os números
      const numbers = value.replace(/\D/g, "");
      // Verifica se está vazio ou se tem pelo menos alguns números
      return !value || numbers.length > 0;
    }, "Telefone é obrigatório"),
  dataNascimento: z.string().min(1, "Data de nascimento é obrigatória"),
  nomeResponsavel: z.string().optional(),
  telefoneResponsavel: z.string().optional(),
  cpfResponsavel: z.string().optional(),
  sensei: z.boolean().optional(),
  atleta: z.boolean().optional(),
  faixa: z.string().min(1, "Faixa é obrigatória"),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine((value) => {
      const numbers = value.replace(/\D/g, "");
      return !value || numbers.length > 0;
    }, "CPF é obrigatório"),
  matriculaFederacao: z.string().optional(),
  rg: z
    .string()
    .min(1, "RG é obrigatório")
    .refine((value) => {
      // Remove todos os caracteres não numéricos para contar apenas os números
      const numbers = value.replace(/\D/g, "");
      // Verifica se está vazio ou se tem pelo menos alguns números
      return !value || numbers.length > 0;
    }, "RG é obrigatório"),
});

export type UpsertUserSchema = z.infer<typeof upsertUserSchema>;
export { upsertUserSchema };
