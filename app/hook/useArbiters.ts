"use client";

import { useContext } from "react";
import { ArbitersContext } from "../context/ArbitersContext";
import { useAuth } from "./useAuth";

export const useArbiters = () => {
  const context = useContext(ArbitersContext);
  const { arbiters } = context;
  const { activeUserData } = useAuth();

  return { arbiters };
};
