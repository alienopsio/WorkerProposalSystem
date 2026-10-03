"use client";

import { useEffect, useState } from "react";
import { usePlanet } from "./usePlanet";
import { useAuth } from "./useAuth";

export const useCustodians = () => {
  const [isCustodian, setIsCustodian] = useState<boolean>(false);

  const { activeUserData } = useAuth();
  const { planet } = usePlanet();

  useEffect(() => {
    let cancelled = false;

    async function checkIfCustodian() {
      if (!activeUserData || !planet) {
        if (!cancelled) setIsCustodian(false);
        return;
      }

      const playerAccount = activeUserData.actor.toString();
      const custodians = (
        await activeUserData.client.v1.chain.get_table_rows({
          code: "dao.worlds",
          scope: planet.key,
          table: "custodians1",
          limit: 1000,
        })
      ).rows.map((row) => row.cust_name);

      if (cancelled) return;

      if (custodians.length === 0) {
        setIsCustodian(false);
        return;
      }

      // DEV tester only on testa. Do not inject onto live planet lists if DEV is mis-set.
      if (
        process.env.NEXT_PUBLIC_VERSION === "DEV" &&
        planet.key === "testa"
      ) {
        custodians.push("awtesterooo1");
      }

      setIsCustodian(custodians.includes(playerAccount));
    }
    checkIfCustodian();
    return () => {
      cancelled = true;
    };
  }, [activeUserData, planet]);

  return { isCustodian };
};
