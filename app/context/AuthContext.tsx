'use client'

import SessionKit, { Session } from '@wharfkit/session'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { createSessionKit } from '../config/initWharfKit'

interface AuthContextData {
  signIn(): Promise<void>
  signOut(): Promise<void>
  activeUserData: Session | null
  isFirstTime: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [activeUserData, setActiveUserData] = useState<Session | null>(null)
  const [sessionKit, setSessionKit] = useState<SessionKit | null>(null)
  const [isFirstTime, setIsFirstTime] = useState(true)

  // Init function or SessionKit
  useEffect(() => {
    async function initSession() {
      const newSessionKit = await createSessionKit()
      setSessionKit(newSessionKit)
    }

    //Function to verify if it is the first time the user is accessing the site
    function checkFirstTime() {
      const visited = localStorage.getItem('visited')
      if (visited) {
        setIsFirstTime(false) // Not first time
      } else {
        setIsFirstTime(true) // Is first time
      }
    }

    checkFirstTime()
    initSession()
  }, [])

  // Restore session
  useEffect(() => {
    if (sessionKit) {
      sessionKit.restore().then((restoredSession) => {
        if (!restoredSession) return
        setActiveUserData(restoredSession)
      })
    }
  }, [sessionKit])

  // login function
  const signIn = async () => {
    if (!sessionKit) return
    const { session } = await sessionKit.login()

    // It checks if it is the first time the user is accessing the site if not create the localStorage item
    if (isFirstTime) {
      localStorage.setItem('visited', 'true') // Set the item to true
    }

    setActiveUserData(session)
  }

  // Logout function
  const signOut = async () => {
    if (!sessionKit) return
    await sessionKit.logout()
    setActiveUserData(null)
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, activeUserData, isFirstTime }}
    >
      {children}
    </AuthContext.Provider>
  )
}
