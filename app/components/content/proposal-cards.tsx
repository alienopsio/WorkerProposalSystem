"use client";
import { ReactNode, useState } from "react";
import {
  ByIcon,
  DurationIcon,
  IdIcon,
  TriangleIcon,
  VotesIcon,
} from "../icons/cardsIcons";
import {
  CardData,
  CardStatus,
} from "../../common/utils/generate-card-data.util";
import { TuseFiltersCards } from "../../hook/useFiltersCards";
import moment from "moment";
import { HighlightProposalModal } from "../modals/highlight-proposal/highlight-proposal.modal";
import { getCardColor } from "@/app/common/utils/get-card-color.util";

type TcardsToShow = TuseFiltersCards["cardsToShow"];

export const ProposalCards = ({
  cardsToShow,
  isLoading,
}: {
  cardsToShow: TcardsToShow;
  isLoading: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData>(cardsToShow[0]);

  return (
    <section
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
    >
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <>
          {cardsToShow.map((card) => {
            const cardColor = getCardColor(card.status);
            return (
              <>
                <div
                  key={card.id}
                  style={{ borderColor: cardColor }}
                  className={`relative cursor-pointer border-b-[30px] border-t-8 w-[280px] 2xl:w-[386px]  bg-black/40 p-4 flex flex-col gap-4`}
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedCard(card);
                  }}
                >
                  <span className="text-3xl xl:text-4xl capitalize py-6">
                    {card.title.slice(0, 20)}
                  </span>
                  <span className="text-sm xl:text-lg">
                    {card.description.length >= 150
                      ? card.description.slice(0, 150)
                      : card.description}
                  </span>

                  <div className="flex flex-col gap-2">
                    <TextCard>
                      <span
                        style={{ color: cardColor }}
                        className={`flex gap-2 text-base items-center `}
                      >
                        <IdIcon height={18} width={18} /> ID:
                      </span>

                      <span className={`text-white font-semibold`}>
                        {card.id.slice(0, 6)}
                      </span>
                    </TextCard>
                    <TextCard>
                      <span
                        style={{ color: cardColor }}
                        className={`flex gap-2 text-base items-center `}
                      >
                        <ByIcon height={18} width={18} /> By:
                      </span>

                      <span className={`text-white font-semibold`}>
                        {card.owner}
                      </span>
                    </TextCard>
                    <TextCard>
                      <span
                        style={{ color: cardColor }}
                        className={`flex gap-2 text-base items-center `}
                      >
                        <TriangleIcon height={18} width={18} /> Cost:
                      </span>

                      <span className={`text-white font-semibold`}>
                        {card.cost}
                      </span>
                    </TextCard>
                    <TextCard>
                      <span
                        style={{ color: cardColor }}
                        className={`flex gap-2 text-base items-center `}
                      >
                        <DurationIcon height={18} width={18} /> Duration:
                      </span>

                      <span className={`text-white font-semibold`}>
                        {moment(moment(card.duration), "YYYYMMDD").fromNow()}
                      </span>
                    </TextCard>
                    <TextCard>
                      <span
                        style={{ color: cardColor }}
                        className={`flex gap-2 text-base items-center `}
                      >
                        <VotesIcon height={18} width={18} /> Votes:
                      </span>

                      <span className={`text-white font-semibold`}>
                        {card.votes.length}/{card.votesNeeded}
                      </span>
                    </TextCard>
                  </div>

                  <span className={`absolute -bottom-6 left-[40%] font-bold`}>
                    {card.status.replace("_", " ")}
                  </span>
                </div>
              </>
            );
          })}
        </>
      )}
      {selectedCard && (
        <HighlightProposalModal
          onClose={() => setIsOpen(false)}
          open={isOpen}
          proposalData={selectedCard}
        />
      )}
    </section>
  );
};

const TextCard = ({ children }: { children: ReactNode }) => {
  return <span className="text-sm flex justify-between">{children}</span>;
};
