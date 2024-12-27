"use client";

import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext } from "react";
import { usePlanetKey } from "../hook/usePlanet";
import { getVotes } from "../services/votes.service";

export interface Vote {
  vote_id: number;
  voter: string;
  proposal_id: string;
  category_id: string | null;
  vote: string;
  deletegate: string | null;
  comment_hash: string | null;
}

interface VotesContextData {
  votesApprove: Vote[];
  votesDeny: Vote[];
  finalizingVotes: Vote[];
  finalizingDenyVotes: Vote[];
}

export const VotesContext = createContext({} as VotesContextData);

type VotesProviderProps = {
  children: ReactNode;
};

export const VotesProvider = ({ children }: VotesProviderProps) => {
  const { planetName } = usePlanetKey();
  const { data: votesTable, isLoading: isVotesTableLoading } = useQuery({
    queryKey: [`worker-votes-${planetName}`],
    queryFn: () => getVotes(planetName),
    refetchInterval: 10000,
    retry: 3,
    retryDelay: 2000,
    refetchIntervalInBackground: true,
  });

  const votesApprove = (votesTable?.rows.map((vote) => vote) as Vote[])?.filter(
    (vote) => vote.vote === "propapprove"
  ) ?? [];

  const finalizingVotes = (votesTable?.rows.map((vote) => vote) as Vote[])?.filter(
    (vote) => vote.vote === "finalapprove"
  ) ?? [];

  const finalizingDenyVotes = (votesTable?.rows.map((vote) => vote) as Vote[])?.filter(
    (vote) => vote.vote === "finaldeny"
  ) ?? [];

  const votesDeny = (votesTable?.rows.map((vote) => vote) as Vote[])?.filter(
    (vote) => vote.vote === "propdeny"
  ) ?? [];

  return (
    <VotesContext.Provider value={{ votesApprove, finalizingVotes, finalizingDenyVotes, votesDeny }}>{children}</VotesContext.Provider>
  );
};
