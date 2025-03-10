import { useAuth } from "@/app/hook/useAuth";
import { Button } from "../../generic/buttons/button";
import { useFeedbackModal } from "@/app/hook/useFeedbackModal";
import { AnyAction } from "@wharfkit/session";
import { usePlanetKey } from "@/app/hook/usePlanet";
import { propWorldsContract } from "@/app/common/constants/token.constant";

export const ArbiterVoteOptions = ({
  proposalId,
  voting,
}: {
  proposalId: string;
  voting: boolean;
}) => {
  const { handleShowFeedbackModal } = useFeedbackModal();
  const { activeUserData } = useAuth();
  const { planetNameKey } = usePlanetKey();

  const handleArbiterVote = async (vote: string) => {
    try {
      if (!activeUserData?.actor) {
        handleShowFeedbackModal(true, {
          message: "You need to be logged in to vote on a proposal",
          type: "error",
        });
        return;
      }

      const voteProposalAction: AnyAction = {
        account: propWorldsContract,
        name: vote,
        authorization: [
          {
            actor: activeUserData.actor,
            permission: "active",
          },
        ],
        data: {
          arbiter: activeUserData.actor.toString(),
          dac_id: planetNameKey,
          proposal_id: proposalId,
        },
      };

      await activeUserData.transact({
        actions: [voteProposalAction],
      });

      const feedbackMessage =
        vote === "arbagree"
          ? "The Proposal has been Approved"
          : "The Proposal has been Denied";

      handleShowFeedbackModal(true, {
        message: feedbackMessage,
        type: "success",
      });
    } catch (error: any) {
      handleShowFeedbackModal(true, {
        message: error?.message ?? error?.toString() ?? "An error occurred",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col text-center gap-2 my-5">
        <h2 className="text-xl font-bold">Arbiter Vote</h2>
        <p className="text-sm">
          As an arbiter, you have the power to decide the fate of this proposal.
          Choose wisely!
        </p>

        <div className="flex gap-2 w-full">
          <Button
            state="completed"
            size="fat"
            onClick={() => handleArbiterVote("arbagree")}
          >
            <b>I agree to be an Arbiter</b>
          </Button>
          {!voting && (
            <Button
              state="expired"
              size="fat"
              onClick={() => handleArbiterVote("arbdeny")}
            >
              <b>DENY!</b>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
