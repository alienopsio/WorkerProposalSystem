"use client";

import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext } from "react";
import { usePlanetKey } from "../hook/usePlanet";
import { useAuth } from "../hook/useAuth";
import { getVariables } from "../services/variables.service";

interface Config {
  data: {
    key: string;
    value: any[];
  }[];
}

interface ConfigsContextData {
  configs: Config[];
}

export const ConfigsContext = createContext({} as ConfigsContextData);

type ConfigsProviderProps = {
  children: ReactNode;
};

export const ConfigsProvider = ({ children }: ConfigsProviderProps) => {
  const { planetName } = usePlanetKey();
  const { data: configsTable, isLoading: isConfigsTableLoading } = useQuery({
    queryKey: [`contract-config-${planetName}`],
    queryFn: () => getVariables(planetName),
    refetchInterval: 10000,
    retry: 3,
    retryDelay: 2000,
    refetchIntervalInBackground: true,
  });

  const configs =
    (configsTable?.rows.map((config) => config) as Config[]) ?? [];

  return (
    <ConfigsContext.Provider value={{ configs }}>
      {children}
    </ConfigsContext.Provider>
  );
};
