"use client";

import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext } from "react";
import { usePlanet } from "../hook/usePlanet";
import { getBalances } from "../services/balances.service";
import { useAuth } from "../hook/useAuth";

interface Balance {
  balance: string;
}

interface BalancesContextData {
  balances: Balance[];
}

export const BalancesContext = createContext({} as BalancesContextData);

type BalancesProviderProps = {
  children: ReactNode;
};

export const BalancesProvider = ({ children }: BalancesProviderProps) => {
  const { planetName } = usePlanet();
  const { accountName } = useAuth();
  const { data: balancesTable, isLoading: isBalancesTableLoading } = useQuery({
    queryKey: [`worker-balances-${planetName}-${accountName}`],
    queryFn: () => getBalances(planetName, accountName),
    refetchInterval: 10000,
    retry: 3,
    retryDelay: 2000,
    refetchIntervalInBackground: true,
  });

  const balances = balancesTable?.rows.map((balance) => balance) as Balance[] ?? [];

  return (
    <BalancesContext.Provider value={{ balances }}>
      {children}
    </BalancesContext.Provider>
  );
};
