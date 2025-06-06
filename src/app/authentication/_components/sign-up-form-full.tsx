"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    sobrenome: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
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
  })
  .refine(
    (data) => {
      // Validação condicional para campos do responsável
      const isMinor = (birthDate: string): boolean => {
        if (!birthDate) return false;
        const today = new Date();
        const birth = new Date(birthDate);
        const age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
          return age - 1 < 18;
        }
        return age < 18;
      };

      const minor = isMinor(data.dataNascimento);

      if (minor) {
        return (
          data.nomeResponsavel &&
          data.telefoneResponsavel &&
          data.cpfResponsavel
        );
      }
      return true;
    },
    {
      message: "Dados do responsável são obrigatórios para menores de 18 anos",
      path: ["nomeResponsavel"],
    },
  );

type SignUpFormData = z.infer<typeof signUpSchema>;

interface FormattedInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
}

// Componentes de input formatados
const FormattedPhoneInput = React.forwardRef<
  HTMLInputElement,
  FormattedInputProps
>((props, ref) => {
  const { onChange, value, ...rest } = props;

  return (
    <PatternFormat
      format="(##) #####-####"
      mask="_"
      customInput={Input}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange(values.value);
      }}
      value={value}
      valueIsNumericString
      {...rest}
    />
  );
});
FormattedPhoneInput.displayName = "FormattedPhoneInput";

const FormattedCPFInput = React.forwardRef<
  HTMLInputElement,
  FormattedInputProps
>((props, ref) => {
  const { onChange, value, ...rest } = props;

  return (
    <PatternFormat
      format="###.###.###-##"
      mask="_"
      customInput={Input}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange(values.value);
      }}
      value={value}
      valueIsNumericString
      {...rest}
    />
  );
});
FormattedCPFInput.displayName = "FormattedCPFInput";

const FormattedRGInput = React.forwardRef<
  HTMLInputElement,
  FormattedInputProps
>((props, ref) => {
  const { onChange, value, ...rest } = props;

  return (
    <PatternFormat
      format="##.###.###-#"
      mask="_"
      customInput={Input}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange(values.value);
      }}
      value={value}
      valueIsNumericString
      {...rest}
    />
  );
});
FormattedRGInput.displayName = "FormattedRGInput";

export default function SignUpFormFull() {
  const router = useRouter();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      sobrenome: "",
      email: "",
      password: "",
      telefone: "",
      dataNascimento: "",
      nomeResponsavel: "",
      telefoneResponsavel: "",
      cpfResponsavel: "",
      sensei: false,
      atleta: true,
      faixa: "",
      rg: "",
      matriculaFederacao: "",
    },
  });

  const dataNascimento = form.watch("dataNascimento");
  const isSensei = form.watch("sensei");
  const faixa = form.watch("faixa");

  // Efeito para atualizar a faixa quando sensei for true
  React.useEffect(() => {
    if (isSensei) {
      form.setValue("faixa", "preta");
    }
  }, [isSensei, form]);

  // Efeito para atualizar sensei quando faixa for preta
  React.useEffect(() => {
    if (faixa === "preta") {
      form.setValue("sensei", true);
    }
  }, [faixa, form]);

  // Função para calcular se é menor de idade
  const isMinor = (birthDate: string): boolean => {
    if (!birthDate) return false;
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      return age - 1 < 18;
    }
    return age < 18;
  };

  const showResponsavelFields = isMinor(dataNascimento);

  const onSubmit = async (values: SignUpFormData) => {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
        sobrenome: values.sobrenome,
        telefone: values.telefone,
        dataNascimento: values.dataNascimento
          ? dayjs(values.dataNascimento).format("YYYY-MM-DD")
          : undefined,
        sensei: values.sensei,
        atleta: values.atleta,
        faixa: values.faixa,
        rg: values.rg,
        matriculaFederacao: values.matriculaFederacao,
        nomeResponsavel: values?.nomeResponsavel || null,
        telefoneResponsavel: values?.telefoneResponsavel || null,
        cpfResponsavel: values?.cpfResponsavel || null,
      } as SignUpFormData,
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_ALREADY_EXISTS") {
            toast.error("E-mail já cadastrado.");
            return;
          }
          toast.error("Erro ao criar conta.");
        },
      },
    );
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardHeader>
            <CardTitle>Criar nova conta</CardTitle>
            <CardDescription>Crie uma conta para continuar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sobrenome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="telefone"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <FormattedPhoneInput
                        placeholder="(11) 99999-9999"
                        value={value}
                        onChange={onChange}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataNascimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <h3 className="text-muted-foreground text-sm font-medium">
                Dados do Responsável{" "}
                {!showResponsavelFields &&
                  "(campos desabilitados para maiores de 18 anos)"}
                {showResponsavelFields && "(menor de 18 anos)"}
              </h3>

              <FormField
                control={form.control}
                name="nomeResponsavel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Responsável</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome do responsável"
                        disabled={!showResponsavelFields}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="telefoneResponsavel"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Telefone do Responsável</FormLabel>
                      <FormControl>
                        <FormattedPhoneInput
                          placeholder="(11) 99999-9999"
                          disabled={!showResponsavelFields}
                          value={value}
                          onChange={onChange}
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpfResponsavel"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>CPF do Responsável</FormLabel>
                      <FormControl>
                        <FormattedCPFInput
                          placeholder="000.000.000-00"
                          disabled={!showResponsavelFields}
                          value={value}
                          onChange={onChange}
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4 border-t pt-4">
              <h3 className="text-muted-foreground text-sm font-medium">
                Informações de Treino
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sensei"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>É Sensei?</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="atleta"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>É Atleta?</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="matriculaFederacao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matricula Federação</FormLabel>
                    <FormControl>
                      <Input placeholder="11111111" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="faixa"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Faixa</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isSensei}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione a faixa" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="branca">Branca</SelectItem>
                            <SelectItem value="amarela">Amarela</SelectItem>
                            <SelectItem value="laranja">Laranja</SelectItem>
                            <SelectItem value="verde">Verde</SelectItem>
                            <SelectItem value="azul">Azul</SelectItem>
                            <SelectItem value="roxa">Roxa</SelectItem>
                            <SelectItem value="marrom">Marrom</SelectItem>
                            <SelectItem value="preta">Preta</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="rg"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>RG</FormLabel>
                        <FormControl>
                          <FormattedRGInput
                            placeholder="00.000.000-0"
                            value={value}
                            onChange={onChange}
                            {...rest}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Criar conta"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
