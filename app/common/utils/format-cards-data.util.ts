import { DataProposalCard } from "@/app/hook/useFiltersCards";
import { CardData } from "./generate-card-data.util";
import { PROPOSAL_STATE_ENUM } from "../constants/state.constant";
import { planets } from "../constants/planets.constant";

/** Prefer the renamed field. Fall back so this branch still renders on the current chain. */
export function approvalWindowValue(card: DataProposalCard): string | undefined {
  return card.approval_expiry ?? card.expiry;
}

export function formatCardsData(
  data: DataProposalCard[],
  planetName: string
): CardData[] {
  return data.map((card: DataProposalCard) => {
    let status = "";

    switch (card.state) {
      case PROPOSAL_STATE_ENUM.STATE_PENDING_APPROVAL:
        status = "voting";
        break;

      case PROPOSAL_STATE_ENUM.STATE_HAS_ENOUGH_APP_VOTES:
        // approval_expiry is the approval window, not proof the job is dead.
        // Start Work follows this contract state.
        status = "voting";
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
      expiry: new Date(approvalWindowValue(card) ?? ""),
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
