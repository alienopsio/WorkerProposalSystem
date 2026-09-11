"use client";

import { useEffect, useState } from "react";
import { usePlanetKey } from "./usePlanet";
import { useAuth } from "./useAuth";

export const useCustomers = () => {
  const [isCustomer, setIsCustomer] = useState<boolean>(false);

  const { activeUserData } = useAuth();
  const { planet } = usePlanetKey();

  useEffect(() => {
    async function checkIfCustomer() {
      if (!activeUserData || !planet) {
        setIsCustomer(false);
        return;
      }

      const playerAccount = activeUserData.actor.toString();
      const customers = (
        await activeUserData.client.v1.chain.get_table_rows({
          code: "prop.worlds",
          table: "recwl",
          scope: planet.key,
          limit: 1000,
        })
      ).rows.map((row) => row.receiver);

      if (customers.length === 0) {
        setIsCustomer(false);
        return;
      }

      setIsCustomer(customers.includes(playerAccount));
    }
    checkIfCustomer();
  }, [activeUserData, planet]);

  return { isCustomer };
};
