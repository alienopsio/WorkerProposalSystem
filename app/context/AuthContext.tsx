'use client'

import SessionKit, { Session } from '@wharfkit/session'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { createSessionKit } from '../config/initWharfKit'

interface AuthContextData {
  signIn(): Promise<void>
  signOut(): Promise<void>
  activeUserData: Session | null
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [activeUserData, setActiveUserData] = useState<Session | null>(null)
  const [sessionKit, setSessionKit] = useState<SessionKit | null>(null)

  useEffect(() => {
    // This code will be executed only once when the component is mounted
    async function initSesion() {
      const newSessionKit = await createSessionKit()
      setSessionKit(newSessionKit)
    }
    initSesion()
    // So when the component is unmounted, the cleanup function will be executed
  }, [])

  useEffect(() => {
    //Will run when sessionkit is changed.
    if (sessionKit) {
      sessionKit.restore().then(restoredSession => {
        if (!restoredSession) return
        setActiveUserData(restoredSession)
      })
    }
  }, [sessionKit])

  const signIn = async () => {
    if (!sessionKit) return // If sessionKit is not initialized, return
    const { session } = await sessionKit.login()
    setActiveUserData(session)
  }

  const signOut = async () => {
    if (!sessionKit) return // If sessionKit is not initialized, return
    await sessionKit.logout()
    setActiveUserData(null)
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, activeUserData }}>
      {children}
    </AuthContext.Provider>
  )
}
