"use client";

import { useEffect, useState } from "react";
import { usePlanet } from "./usePlanet";
import { useAuth } from "./useAuth";

export const useCustomers = () => {
  const [isCustomer, setIsCustomer] = useState<boolean>(false);

  const { activeUserData } = useAuth();
  const { planet } = usePlanet();

  useEffect(() => {
    async function checkIfCustomer() {
      if (activeUserData && planet) {
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

        const isCustomerAccount = customers.includes(playerAccount);
        setIsCustomer(isCustomerAccount);
      }
    }
    checkIfCustomer();
  }, [activeUserData, planet]);

  return { isCustomer };
};
