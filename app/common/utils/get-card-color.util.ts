import { CardStatus } from "./generate-card-data.util";

export const getCardColor = (status: string) => {
  const colors: { [key: string]: string } = {
    [CardStatus.voting]: "#FFD60080",
    [CardStatus.in_progress]: "#DBFF0080",
    [CardStatus.finalizing]: "#00FF9480",
    [CardStatus.completed]: "#00FFFF80",
    [CardStatus.in_dispute]: "#FF29D080",
    [CardStatus.rejected]: "#FF3A3A80",
    [CardStatus.expired]: "#9F9F9F80",
  };

  return colors[status];
};
