import InputLabel from '@/Components/input'
import Link from 'next/link'
export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-zinc-900">Login</h1>
      <form action="#" method="POST">
        {/* Username Input */}
        <div className="mb-4">
          <InputLabel
            label="E-mail"
            name="email"
            placeholder="Digite seu e-mail"
          />
        </div>
        {/* Password Input */}
        <div className="mb-4">
          <InputLabel
            label="Senha"
            name="senha"
            type="password"
            placeholder="Digite sua senha"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-md py-2 px-4 w-full"
        >
          Login
        </button>
      </form>
      {/* Sign up Link */}
      <div className="mt-6 text-blue-500 text-center">
        <Link href="/signUp" className="hover:underline">
          Cadastre-se
        </Link>
      </div>
    </>
  )
}
