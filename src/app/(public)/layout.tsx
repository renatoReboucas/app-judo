import type { Metadata } from 'next'
import Image from 'next/image'
import image from '../../../public/judo.jpg'

export const metadata: Metadata = {
  title: 'App Judô',
  description: 'App Judô',
  icons: {
    icon: './favicon.ico',
  },
  openGraph: {
    title: 'App Judô',
    description: 'Sistema de Gestão para Judô',
    images: [
      {
        url: '../../public/judo.jpg', // Coloque sua imagem na pasta public
        width: 1200,
        height: 630,
        alt: 'App Judô Preview',
      },
    ],
  },
}

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col lg:flex-row">
      {/* Left: Image */}
      <div className="hidden lg:block lg:w-1/2 lg:h-screen fixed left-0">
        <Image
          src={image}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
          width={800}
          height={600}
          priority
        />
      </div>

      {/* Right: Content */}
      <div className="w-full lg:w-1/2 lg:ml-auto min-h-screen">
        <div className="w-full max-w-2xl mx-auto p-6 lg:p-12">{children}</div>
      </div>
    </div>
  )
}
