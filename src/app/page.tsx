import Image from 'next/image'
import image from '../../public/judo.jpg'
export default function Home() {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-1/2 h-screen hidden lg:block">
        {/* <div className="bg-black object-cover w-full h-full"></div> */}
        <Image
          src={image}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
          width={800}
          height={600}
        />
      </div>
      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form action="#" method="POST">
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="senha" className="block text-gray-600">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* Remember Me Checkbox */}
          {/* <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div> */}
          {/* Forgot Password Link */}
          {/* <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div> */}
          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
        {/* Sign up Link */}
        <div className="mt-6 text-blue-500 text-center">
          <a href="#" className="hover:underline">
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  )
}
