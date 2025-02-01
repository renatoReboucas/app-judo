'use client'
import InputLabel from '@/Components/input'
import Select from '@/Components/select'

const faixas = [
  { value: 'branca', label: 'Branca' },
  { value: 'cinza', label: 'Cinza' },
  { value: 'azul', label: 'Azul' },
  { value: 'amarela', label: 'Amarela' },
  { value: 'laranja', label: 'Laranja' },
  { value: 'verde', label: 'Verde' },
  { value: 'roxa', label: 'Roxa' },
  { value: 'marrom', label: 'Marrom' },
  { value: 'preta', label: 'Preta' },
]

export default function SignUp() {
  return (
    <div className="p-8 max-w-2xl mx-auto text-zinc-950">
      <h1 className="text-2xl font-semibold mb-6 text-zinc-900">Cadastre-se</h1>

      <form className="space-y-6">
        {/* Dados pessoais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputLabel label="Nome *" name="nome" type="text" required />
          <InputLabel
            label="Sobrenome *"
            name="sobrenome"
            type="text"
            required
          />
          <InputLabel label="Email *" name="email" type="email" required />
          <InputLabel label="Senha *" name="senha" type="password" required />
          <InputLabel label="Telefone *" name="telefone" type="tel" required />
          <InputLabel
            label="Data de Nascimento *"
            name="dataNascimento"
            type="date"
            required
          />
        </div>

        {/* Dados do responsável */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-zinc-900">
            Dados do Responsável
            <span className="text-sm text-red-500 ml-2">
              (Obrigatório para menores de 18 anos)
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputLabel
              label="Nome do Responsável *"
              name="nomeResponsavel"
              type="text"
            />
            <InputLabel
              label="Telefone do Responsável *"
              name="telefoneResponsavel"
              type="tel"
            />
          </div>
        </div>

        {/* Informações do Judô */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-zinc-900">
            Informações do Judô
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="sensei"
                id="sensei"
                className="checkbox"
              />
              <label htmlFor="sensei">Sensei</label>
            </div>
            <Select label="Selecione a cor da sua faixa *" options={faixas} />
          </div>
        </div>

        <button
          type="submit"
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-md py-2 px-4 w-full"
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}
