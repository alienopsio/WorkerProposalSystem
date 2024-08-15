"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { PlanetProvider } from "./context/PlanetContext";
import { Toaster } from "react-hot-toast";
import { FeedbackModalProvider } from "./context/FeedbackModalContext";
import { ArbitersProvider } from "./context/ArbitersContext";
import { VotesProvider } from "./context/VotesContext";

const providers = [AuthProvider, PlanetProvider, FeedbackModalProvider, ArbitersProvider, VotesProvider];
const queryClient = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {providers.reduceRight((acc, Provider) => {
          return <Provider>{acc}</Provider>;
        }, children)}
        <Toaster />
      </QueryClientProvider>
    </>
  );
}
