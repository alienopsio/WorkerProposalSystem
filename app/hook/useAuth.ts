'use client';

import { useContext }   from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { signIn, signOut, activeUserData } = context;
    return { signIn, signOut, activeUserData };
}