"use client";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../hook/useAuth";
import { Button } from "../generic/buttons/button";

export const LogInLink = () => {
  const { activeUserData, signOut } = useAuth();
  const isLogged = activeUserData?.actor;
  const handleOneClick = () => {
    if (isLogged) {
      signOut();
    }

    history.replaceState(null, "", "?visitor=false");
  };

  return (
    <Button state="dark" onClick={handleOneClick}>{isLogged ? "Log Out" : "Log In"}</Button>
  );
};
