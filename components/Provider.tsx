'use client'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { ReactNode } from 'react'


const Provider = ({children, session }: {
  children: ReactNode | null,
  session: Session | null
}) => {
  return (<SessionProvider session = {session}>
    {children}
    </SessionProvider>)
}

export default Provider