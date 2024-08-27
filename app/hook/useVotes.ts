"use client";

import { useContext } from "react";
import { useAuth } from "./useAuth";
import { VotesContext } from "../context/VotesContext";

export const useVotes = ({ proposal_id }: { proposal_id: string }) => {
  const context = useContext(VotesContext);
  const { votesApprove, votesDeny, finalizingVotes, finalizingDenyVotes } = context;
  const { activeUserData } = useAuth();

  const votesForProposal = votesApprove.filter(
    (vote) => vote.proposal_id === proposal_id
  );

  const playerAccountName = activeUserData?.actor.toString();

  const finalizingVotesForProposal = finalizingVotes.filter(
    (vote) => vote.proposal_id === proposal_id
  );

  const myVotes = votesForProposal.filter(
    (vote) => vote.voter === playerAccountName
  );

  const finalizingDenyVotesForProposal = finalizingDenyVotes.filter(
    (vote) => vote.proposal_id === proposal_id
  );

  const votesDenyForProposal = votesDeny.filter(
    (vote) => vote.proposal_id === proposal_id
  );

  return {
    votesApprove,
    votesDeny,
    finalizingVotes,
    votesForProposal,
    votesDenyForProposal,
    myVotes,
    finalizingVotesForProposal,
    finalizingDenyVotesForProposal,
  };
};
