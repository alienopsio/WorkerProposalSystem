'use client'

import { ReactNode, createContext, useEffect, useState } from 'react'
import { Planet, planets } from '../common/constants/planets.constant'

interface PlanetContextData {
  planet: Planet | null
  set: (key: string) => void
  getRandomPlanet: () => Planet
}

export const PlanetContext = createContext({} as PlanetContextData)

type PlanetProviderProps = {
  children: ReactNode
}

export const PlanetProvider = ({ children }: PlanetProviderProps) => {
  const [planet, setPlanet] = useState<Planet | null>(null)

  useEffect(() => {
    const getSavedPlanet = localStorage.getItem('planet')
    if (!getSavedPlanet) {
      return setPlanet(getRandomPlanet())
    }
    set(getSavedPlanet)
  }, [])

  const set = (key: string) => {
    const found = planets.find(planet => planet.key === key)
    if (found) {
      setPlanet(found)
    }
  }

  function getRandomPlanet() {
    return planets[Math.floor(Math.random() * planets.length)]
  }
  return (
    <PlanetContext.Provider value={{ planet, set, getRandomPlanet }}>
      {children}
    </PlanetContext.Provider>
  )
}
