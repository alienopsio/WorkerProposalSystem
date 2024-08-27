import { CardStatus } from "./generate-card-data.util";

const filters = [
  {
    name: "all_proposals",
    showName: "All Proposals",
    color: "#FFF",
  },
  {
    name: CardStatus.voting,
    showName: "Voting",
    color: "#FFD600",
  },
  {
    name: CardStatus.in_progress,
    showName: "In Progress",
    color: "#DBFF00",
  },
  {
    name: CardStatus.finalizing,
    showName: "Finalizing",
    color: "#00FF94",
  },
  {
    name: CardStatus.completed,
    showName: "Completed",
    color: "#00FFFF",
  },
  {
    name: CardStatus.in_dispute,
    showName: "In Dispute",
    color: "#FF29D0",
  },
  {
    name: CardStatus.rejected,
    showName: "Rejected",
    color: "#FF3A3A",
  },
  {
    name: CardStatus.expired,
    showName: "Expired",
    color: "#9F9F9F",
  },
];

export const getShowName = (status: string) => {
  const filter = filters.find((filter) => filter.name === status);

  return filter?.showName ?? status;
};
