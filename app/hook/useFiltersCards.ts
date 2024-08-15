"use client";

import { useState } from "react";
import { CardData, CardStatus } from "../common/utils/generate-card-data.util";
import { formatCardsData } from "../common/utils/format-cards-data.util";
import { usePlanet } from "./usePlanet";
import { useVotes } from "./useVotes";

interface ReturnUseFiltersCards {
  cardsToShow: CardData[];
  isLoading: boolean;
  handleSelectFilter: (selectedFilter: string) => void;
}

export type PayContract = {
  quantity: string;
  contract: string;
};

export interface DataProposalCard {
  arbiter: string;
  arbiter_agreed: number | boolean;
  arbiter_pay: PayContract;
  category: number | boolean;
  content_hash: string;
  created_at: string;
  expiry: string;
  job_duration: number;
  proposal_id: number;
  proposal_pay: PayContract;
  proposer: string;
  state: string;
  summary: string;
  title: string;
}

export type TuseFiltersCards = ReturnType<typeof useFiltersCards>;

const useFiltersCards = (data: DataProposalCard[]): ReturnUseFiltersCards => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all_proposals");
  const { planetName } = usePlanet();

  const cardsToFilter = formatCardsData(data, planetName);

  const { votesApprove, finalizingVotes, votesDeny } = useVotes({ proposal_id: "1" });

  const cardsFiltered = cardsToFilter.filter(
    (card) => card.status.toLowerCase() === selectedFilter
  );

  const cardsToShow =
    selectedFilter === CardStatus.all_proposals ? cardsToFilter : cardsFiltered;

  const cardsToShowWithVotes = cardsToShow.map((card) => {
    const votesForCard = votesApprove.filter((vote) => vote.proposal_id === card.id);
    const finalizingVotesForCard = finalizingVotes.filter(
      (vote) => vote.proposal_id === card.id
    );

    return {
      ...card,
      votes: votesForCard,
      votesDeny: votesDeny,
      votesFinal: finalizingVotesForCard,
    };
  });

  const handleSelectFilter = (selectedFilter: string) => {
    return setSelectedFilter(selectedFilter);
  };

  return {
    cardsToShow: cardsToShowWithVotes,
    handleSelectFilter,
    isLoading: false,
  };
};

export default useFiltersCards;
