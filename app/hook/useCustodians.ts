"use client";

import { useEffect, useState } from "react";
import { usePlanet } from "./usePlanet";
import { useAuth } from "./useAuth";

export const useCustodians = () => {
  const [isCustodian, setIsCustodian] = useState<boolean>(false);

  const { activeUserData } = useAuth();
  const { planet } = usePlanet();

  useEffect(() => {
    async function checkIfCustodian() {
      if (activeUserData && planet) {
        const playerAccount = activeUserData.actor.toString();
        const custodians = (
          await activeUserData.client.v1.chain.get_table_rows({
            code: "dao.worlds",
            scope: planet.key,
            table: "custodians1",
            limit: 1000,
          })
        ).rows.map((row) => row.cust_name);

        if (custodians.length === 0) {
          setIsCustodian(false);
          return;
        }
        if (process.env.NEXT_PUBLIC_VERSION === 'DEV') {
          // Add a debug account to the list of custodians
          const debugAccount = "awtesterooo1";
          custodians.push(debugAccount);
        }

        const isCustodianAccount = custodians.includes(playerAccount);
        setIsCustodian(isCustodianAccount);
      }
    }
    checkIfCustodian();
  }, [activeUserData, planet]);

  return { isCustodian };
};
