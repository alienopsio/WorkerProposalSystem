"use client";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { signIn, signOut, activeUserData, isFirstTime } = context;
  const accountName = activeUserData?.actor.toString() ?? "";
  return { signIn, signOut, isFirstTime, activeUserData, accountName };
};
