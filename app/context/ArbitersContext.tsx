"use client";

import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext } from "react";
import { usePlanetKey } from "../hook/usePlanet";
import { getArbiters } from "../services/arbiters.service";

interface Arbiter {
  arbiter: string;
  rating: number;
}

interface ArbitersContextData {
  arbiters: Arbiter[];
}

export const ArbitersContext = createContext({} as ArbitersContextData);

type ArbitersProviderProps = {
  children: ReactNode;
};

export const ArbitersProvider = ({ children }: ArbitersProviderProps) => {
  const { planetNameKey } = usePlanetKey();
  const { data: arbitersTable, isLoading: isArbitersTableLoading } = useQuery({
    queryKey: [`worker-arbiters-${planetNameKey}`],
    queryFn: () => getArbiters(planetNameKey),
    refetchInterval: 10000,
    retry: 3,
    retryDelay: 2000,
    refetchIntervalInBackground: true,
  });

  const arbiters = arbitersTable?.rows.map((arbiter) => arbiter) as Arbiter[];

  return (
    <ArbitersContext.Provider value={{ arbiters }}>
      {children}
    </ArbitersContext.Provider>
  );
};
