import { DataProposalCard } from "@/app/hook/useFiltersCards";
import { CardData } from "./generate-card-data.util";
import { PROPOSAL_STATE_ENUM } from "../constants/state.constant";
import { planets } from "../constants/planets.constant";

export function formatCardsData(
  data: DataProposalCard[],
  planetName: string
): CardData[] {
  return data.map((card: DataProposalCard) => {
    let status = "";

    switch (card.state) {
      case PROPOSAL_STATE_ENUM.STATE_PENDING_APPROVAL:
        status = "voting";
        
        if (status !== "expired") {
          const expiryDate = new Date(card.expiry);

          if (expiryDate < new Date()) {
            status = "expired";
          }
        }

        break;

      case PROPOSAL_STATE_ENUM.STATE_HAS_ENOUGH_APP_VOTES:
        status = "voting";
        if (status !== "expired") {
          const expiryDate = new Date(card.expiry);

          if (expiryDate < new Date()) {
            status = "expired";
          }
        }
        
        break;

      case PROPOSAL_STATE_ENUM.STATE_IN_PROGRESS:
        status = "in_progress";
        break;

      case PROPOSAL_STATE_ENUM.STATE_EXPIRED:
        status = "expired";
        break;

      case PROPOSAL_STATE_ENUM.STATE_DISPUTED:
        status = "in_dispute";
        break;

      case PROPOSAL_STATE_ENUM.STATE_PENDING_FINALIZE:
        status = "finalizing";
        break;

      case PROPOSAL_STATE_ENUM.STATE_HAS_ENOUGH_FIN_VOTES:
        status = "finalizing";
        break;
      
      case PROPOSAL_STATE_ENUM.STATE_IS_COMPLETED:
        status = "completed";
        break;

      default:
        status = "not_mapped";
        break;
    }

    const minVotes = planets.find(
      (planet) => planet.name === planetName
    )?.minVote;

    return {
      id: card.proposal_id.toString(),
      title: card.title,
      description: card.summary,
      owner: card.proposer,
      arbiter: card.arbiter,
      cost: card.proposal_pay.quantity,
      expiry: new Date(card.expiry),
      job_duration	: card.job_duration,
      votes: [],
      votesFinal: [],
      votesNeeded: minVotes || 3,
      votesDeny: [],
      arbiter_agreed: Boolean(card.arbiter_agreed),
      status,
      cardstate: card.state,
      contentHash: card.content_hash,
    };
  });
}
