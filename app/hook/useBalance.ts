"use client";

import { useContext } from "react";
import { BalancesContext } from "../context/BalanceContext";

export const useBalance = () => {
  const context = useContext(BalancesContext);
  const { balances } = context;
  const testaBalanceRow = balances?.find((balance) =>
    balance.balance.includes("TESTA")
  ) as { balance: string };
  const tlmBalanceRow = balances?.find((balance) =>
    balance.balance.includes("TLM")
  ) as { balance: string };

  const testaBalanceAmount = +testaBalanceRow?.balance.split(" ")[0];
  const tlmBalanceAmount = +tlmBalanceRow?.balance.split(" ")[0];

  const testaBalance = {
    amount: testaBalanceAmount,
    symbol: "TESTA",
  };

  const tlmBalance = {
    amount: tlmBalanceAmount,
    symbol: "TLM",
  };

  return { testaBalance, tlmBalance };
};
