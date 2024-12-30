'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

import Button from '@/Components/Button'
import Input from '@/Components/Input'
import InputPassword from '@/Components/InputPassword'

type User = {
  email: string
  password: string
  confirmPassword?: string
}

export default function Login() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<User>()

  async function handleSubmitLogin() {
    const email = getValues('email')
    const password = getValues('password')
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (result?.error) {
      console.error('DEU RUIM!', result.error)
      return
    }

    // replace nao armazena histórico do navegador
    router.replace('/home')
  }

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.replace('/home')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return <div>Carregando...</div>
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5 text-zinc-950">
          Judo
        </h1>
        <div className="bg-white shadow-xl w-full rounded-lg divide-y ">
          <form
            className="px-5 py-7"
            onSubmit={handleSubmit(handleSubmitLogin)}
          >
            <Input
              {...register('email', { required: 'E-mail é obrigatório' })}
              type="email"
              label="E-mail"
              className="input-md"
              placeholder="Digite seu e-mail"
            />
            <InputPassword
              label="Senha"
              placeholder="Digite sua senha"
              className="input-md"
              {...register('password', { required: 'Informe a senha' })}
            />

            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                className="btn-sm"
                variant="neutral"
                label="Entrar"
              />
            </div>
          </form>
          <div className="py-5">
            {/* <div className="grid grid-cols-2 gap-1"> */}
            <div className="flex justify-center">
              {/* <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div> */}
              <div className="text-center sm:text-right  whitespace-nowrap">
                <button className=" mx-5 px-5 py-4 ">
                  <Link href="/signup">
                    <Button
                      label="Cadastrar"
                      variant="ghost"
                      className="text-zinc-950"
                    />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
