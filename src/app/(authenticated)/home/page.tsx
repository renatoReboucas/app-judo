'use client'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()
  useEffect(() => {
    console.log('Session:', session)
    console.log('Status:', status)
    if (status === 'authenticated' && session) {
      console.log('authenticated')
    }
  }, [status, session])

  if (status === 'loading') {
    return <div>Carregando...</div>
  }
  return <div>Home</div>
}
