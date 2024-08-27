'use client'

import { useAuth } from "@/app/hook/useAuth"

export const VisitorInfo = () => {
  const { activeUserData } = useAuth()
  const visitor = activeUserData ? activeUserData.actor.toString() : 'visitor'
  return (
    <div>
      <span>{visitor}</span>
    </div>
  )
}
