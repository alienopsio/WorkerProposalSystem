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
        const planetAddress = planet.address;
        const planetAccountData =
          await activeUserData.client.v1.chain.get_account(planetAddress);
        const permissions = planetAccountData?.permissions;
        const highPermission = permissions?.find(
          (permission) => permission.perm_name.toString() === "high"
        );
        const custodians = highPermission?.required_auth.accounts.map(
          (account) => account.permission.actor.toString()
        );

        const isCustodianAccount = custodians?.includes(playerAccount) ?? false;
        setIsCustodian(isCustodianAccount);
      }
    }
    checkIfCustodian();
  }, [activeUserData, planet]);

  return { isCustodian };
};
