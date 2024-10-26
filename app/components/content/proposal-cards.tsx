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
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-2`}
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
                  className={`flex cursor-pointer bg-black/40 flex-col min-h-[400px] transition-opacity`}
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedCard(card);
                  }}
                >
                  <div
                    className="flex h-2"
                    style={{ backgroundColor: cardColor }}
                  ></div>
                  <div className="flex flex-col gap-4 px-2 min-h-[366px]">
                    <div className="flex py-6 h-[120px]">
                      <span className="flex text-3xl xl:text-4xl capitalize justify-center items-center">
                        {card.title.slice(0, 20)}
                      </span>
                    </div>
                    <span className="text-sm xl:text-lg h-[50px]">
                      {card.description.length >= 50
                        ? card.description.slice(0, 47) + "..."
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
                  </div>
                  <div
                    className={`flex text-center w-full font-medium h-8 items-center justify-center text-xl`}
                    style={{ backgroundColor: cardColor }}
                  >
                    <span>{card.status.replace("_", " ")}</span>
                  </div>
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
