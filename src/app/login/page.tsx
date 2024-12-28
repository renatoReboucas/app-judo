'use client'
import Button from '@/Components/Button'
import Divider from '@/Components/Divider'
import Input from '@/Components/Input'
import InputPassword from '@/Components/InputPassword'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

type User = {
  email: string
  password: string
  confirmPassword?: string
}

export default function Login() {
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<User>()

  async function signIn() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: getValues('email'),
        password: getValues('password'),
      })
      if (data.session) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        })

        router.push('/home')
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Login"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10 space-y-2">
          <form onSubmit={handleSubmit(signIn)}>
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
            <Divider />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="btn-sm"
                variant="neutral"
                label="Entrar"
              />
            </div>
          </form>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Sign-in"
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 2
        </div>
      </div>
    </div>
  )
}
