"use client";

import useFiltersCards from "@/app/hook/useFiltersCards";
import { ProposalCards } from "../content/proposal-cards";
import { useQuery } from "@tanstack/react-query";
import { usePlanetKey } from "@/app/hook/usePlanet";
import { getProposals } from "@/app/services/proposals.service";
import StatusBarPlanet from "../header/statusbar-planet";
import FilterProposalBar from "../content/filter-proposal-bar";

export default function WorkerProposalsLayout() {
  const { planetNameKey } = usePlanetKey();

  const { data: proposalsTable, isLoading: isProposalsTableLoading } = useQuery(
    {
      queryKey: [`worker-proposals-${planetNameKey}`],
      queryFn: () => getProposals(planetNameKey),
      refetchInterval: 10000,
      retry: 3,
      retryDelay: 2000,
      refetchIntervalInBackground: true,
    }
  );

  const { cardsToShow, handleSelectFilter } = useFiltersCards(
    proposalsTable?.rows ?? []
  );
  return (
    <div className=" relative flex flex-col px-8 gap-5 w-full " id="layout_root">
      <StatusBarPlanet />
      <FilterProposalBar handleSelectFilter={handleSelectFilter} />
      <ProposalCards
        cardsToShow={cardsToShow}
        isLoading={isProposalsTableLoading}
      />
    </div>
  );
}
