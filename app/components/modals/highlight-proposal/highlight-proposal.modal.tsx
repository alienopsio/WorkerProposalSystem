import Modal, { ModalProps } from "react-responsive-modal";
import { Button } from "../../generic/buttons/button";
import { usePlanet } from "@/app/hook/usePlanet";
import { useAuth } from "@/app/hook/useAuth";
import { AnyAction } from "@wharfkit/session";
import { useFeedbackModal } from "@/app/hook/useFeedbackModal";
import { CardData } from "@/app/common/utils/generate-card-data.util";
import {
  ByIcon,
  DurationIcon,
  IdIcon,
  TriangleIcon,
  VotesIcon,
} from "../../icons/cardsIcons";
import moment from "moment";
import { getCardColor } from "@/app/common/utils/get-card-color.util";
import { CustodiansVoteOptions } from "./custodians-vote-options";
import { ArbiterVoteOptions } from "./arbiter-vote-options";
import { useCustodians } from "@/app/hook/useCustodians";
import { useVotes } from "@/app/hook/useVotes";
import { getShowName } from "@/app/common/utils/get-card-show-name.util";
import { propWorldsContract } from "@/app/common/constants/token.constant";

interface HighlightProposalModalProps extends ModalProps {
  // Define props here
  proposalData: CardData;
}

export const HighlightProposalModal = ({
  onClose,
  open,
  proposalData,
}: HighlightProposalModalProps) => {
  const { handleShowFeedbackModal } = useFeedbackModal();

  const { planetName, planet } = usePlanet();
  const { isCustodian } = useCustodians();
  const { activeUserData } = useAuth();

  const { finalizingDenyVotesForProposal } = useVotes({
    proposal_id: proposalData?.id,
  });

  const isArbiter = proposalData?.arbiter === activeUserData?.actor.toString();

  const isFinalizing = proposalData?.status === "finalizing";
  const isVoting = proposalData?.status === "voting";
  const canVote = (isVoting || isFinalizing) && isCustodian;

  const isAproved = proposalData?.arbiter_agreed ?? false;
  const reachedVotes = proposalData?.votes?.length >= proposalData?.votesNeeded;
  const isProposalOwner =
    proposalData?.owner === activeUserData?.actor.toString();

  const isProgress = proposalData?.status === "in_progress";
  const canStartWork =
    reachedVotes &&
    isAproved &&
    isProposalOwner &&
    !isProgress &&
    !isFinalizing &&
    isVoting;

  const canCompleteWork = isProgress && isProposalOwner;

  const reachedVotesForFinalizing = proposalData?.votesFinal
    ? proposalData?.votesFinal?.length >= proposalData?.votesNeeded
    : false;

  const reachedDenyVotesForFinalizing =
    finalizingDenyVotesForProposal.length >= proposalData?.votesNeeded;

  const isCompleted = proposalData?.status === "completed";
  const canFinalizeInCompleted = isCompleted && isProposalOwner;

  const canDispute =
    isProposalOwner && isFinalizing && reachedDenyVotesForFinalizing;

  const isInDispute = proposalData?.status === "in_dispute";

  const canArbiterInDispute = isInDispute && isArbiter;

  const handleVoteProposal = async (vote: string) => {
    const voteAction = isFinalizing ? "votepropfin" : "voteprop";

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
        name: voteAction,
        authorization: [
          {
            actor: activeUserData.actor,
            permission: "active",
          },
          {
            actor: planet?.address ?? "testadacdacc",
            permission: "one",
          },
        ],
        data: {
          custodian: activeUserData.actor.toString(),
          dac_id: planetName,
          proposal_id: proposalData.id,
          vote,
        },
      };

      await activeUserData.transact({
        actions: [voteProposalAction],
      });

      handleShowFeedbackModal(true, {
        message: "Your vote has been cast. Thank you!",
        type: "success",
      });
    } catch (error: any) {
      handleShowFeedbackModal(true, {
        message: error?.message ?? error?.toString() ?? "An error occurred",
        type: "error",
      });
    }
  };

  const handleStartWorkProposal = async () => {
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
        name: "startwork",
        authorization: [
          {
            actor: activeUserData.actor,
            permission: "active",
          },
        ],
        data: {
          dac_id: planetName,
          proposal_id: proposalData.id,
        },
      };

      await activeUserData.transact({
        actions: [voteProposalAction],
      });

      handleShowFeedbackModal(true, {
        message: "Your proposal started. Thank you!",
        type: "success",
      });
    } catch (error: any) {
      handleShowFeedbackModal(true, {
        message: error?.message ?? error?.toString() ?? "An error occurred",
        type: "error",
      });
    }
  };

  const handleCompleteWorkProposal = async () => {
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
        name: "completework",
        authorization: [
          {
            actor: activeUserData.actor,
            permission: "active",
          },
        ],
        data: {
          dac_id: planetName,
          proposal_id: proposalData.id,
        },
      };

      await activeUserData.transact({
        actions: [voteProposalAction],
      });

      handleShowFeedbackModal(true, {
        message: "Your proposal completed. Thank you!",
        type: "success",
      });
    } catch (error: any) {
      handleShowFeedbackModal(true, {
        message: error?.message ?? error?.toString() ?? "An error occurred",
        type: "error",
      });
    }
  };

  const handleFinalizeWorkProposal = async () => {
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
        name: "finalize",
        authorization: [
          {
            actor: activeUserData.actor,
            permission: "active",
          },
        ],
        data: {
          dac_id: planetName,
          proposal_id: proposalData.id,
        },
      };

      await activeUserData.transact({
        actions: [voteProposalAction],
      });

      handleShowFeedbackModal(true, {
        message: "Your proposal finalized. Thank you!",
        type: "success",
      });
    } catch (error: any) {
      handleShowFeedbackModal(true, {
        message: error?.message ?? error?.toString() ?? "An error occurred",
        type: "error",
      });
    }
  };

  const handleDisputeWorkProposal = async () => {
    try {
      if (!activeUserData?.actor) {
        handleShowFeedbackModal(true, {
          message: "You need to be logged in to vote on a proposal",
          type: "error",
        });
        return;
      }

      const disputeActionEscrwWorlds: AnyAction = {
        account: "escrw.worlds",
        name: "dispute",
        authorization: [
          {
            actor: activeUserData.actor,
            permission: "active",
          },
        ],
        data: {
          key: proposalData.id,
          dac_id: planetName,
        },
      };
      const disputeActionPropWorlds: AnyAction = {
        account: propWorldsContract,
        name: "dispute",
        authorization: [
          {
            actor: activeUserData.actor,
            permission: "active",
          },
        ],
        data: {
          proposal_id: proposalData.id,
          dac_id: planetName,
        },
      };

      await activeUserData.transact({
        actions: [disputeActionEscrwWorlds, disputeActionPropWorlds],
      });

      handleShowFeedbackModal(true, {
        message: "You have Disputed your Proposal. Please wait for the Arbiter to review the Work.",
        type: "success",
      });
    } catch (error: any) {
      handleShowFeedbackModal(true, {
        message: error?.message ?? error?.toString() ?? "An error occurred",
        type: "error",
      });
    }
  };

  const handleArbiterDisputeWorkProposal = async (vote: string) => {
    const isDeny = vote === "deny";
    const firstAction = isDeny ? "disapprove" : "approve";
    const secondAction = isDeny ? "arbdeny" : "arbapprove";

    try {
      if (!activeUserData?.actor) {
        handleShowFeedbackModal(true, {
          message: "You need to be logged in to vote on a proposal",
          type: "error",
        });
        return;
      }

      const appendData = isDeny
        ? { disapprover: activeUserData.actor.toString() }
        : { approver: activeUserData.actor.toString() };
      const arbiterActionEscrwWorlds: AnyAction = {
        account: "escrw.worlds",
        name: firstAction,
        authorization: [
          {
            actor: activeUserData.actor,
            permission: "active",
          },
        ],
        data: {
          key: proposalData.id,
          dac_id: planetName,
          ...appendData,
        },
      };
      const arbiterActionPropWorlds: AnyAction = {
        account: propWorldsContract,
        name: secondAction,
        authorization: [
          {
            actor: activeUserData.actor,
            permission: "active",
          },
        ],
        data: {
          proposal_id: proposalData.id,
          dac_id: planetName,
          arbiter: activeUserData.actor.toString(),
        },
      };

      await activeUserData.transact({
        actions: [arbiterActionEscrwWorlds, arbiterActionPropWorlds],
      });

      const feedbackMessage = isDeny ? "The Worker Proposal is disputed and denied." : "The Worker Proposal is disputed and approved.";

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

  const headerColor = getCardColor(proposalData?.status ?? "voting");
  const headerName = getShowName(proposalData?.status ?? "voting");

  return (
    <Modal
      open={open}
      onClose={onClose}
      styles={{
        modal: {
          backgroundColor: "#030303",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "700px",
          padding: "0px",
        },
        modalContainer: {
          display: "flex",
          justifyContent: "right",
          background: "transparent",
        },
        closeIcon: { fill: "#fff" },
      }}
    >
      <>
        {proposalData?.status && (
          <div className="flex flex-col">
            <div
              className={"flex w-full h-12 items-center pl-12 text-white"}
              style={{
                backgroundColor: headerColor,
              }}
            >
              <h2 className="font-bold text-xl capitalize">
                {headerName}
              </h2>
            </div>
            <div className="flex flex-col p-6 gap-3">
              <h2 className="text-2xl font-bold text-white capitalize">
                {proposalData.title}
              </h2>
              <div className="flex items-center gap-2 mt-4">
                <IdIcon width={20} height={20} />
                <span className="text-white text-lg">
                  ID: {proposalData.id}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <ByIcon width={20} height={20} />
                <span className="text-white text-lg">
                  By: {proposalData.owner}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <ByIcon width={20} height={20} />
                <span className="text-white text-lg">
                  Arbiter: {proposalData.arbiter}{" "}
                  <b>({isAproved ? "Approved ✅" : "Pending approve⏳"})</b>
                </span>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <TriangleIcon width={20} height={20} />
                <span className="text-white text-lg">
                  Cost: {proposalData.cost}
                </span>
              </div>
              {!isFinalizing && (
                <>
                  <div className="flex items-center gap-2 mt-4">
                    <VotesIcon width={20} height={20} />
                    <span className="text-white text-lg">
                      Votes: {proposalData.votes.length}/
                      {proposalData.votesNeeded}{" "}
                      <b>({reachedVotes ? "Reached ✅" : "Not Reached ⏳"})</b>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <VotesIcon width={20} height={20} />
                    <span className="text-white text-lg">
                      Deny Votes: {proposalData.votesDeny.length}/
                      {proposalData.votesNeeded}{" "}
                      <b>{reachedDenyVotesForFinalizing && "Denied 🟥"}</b>
                    </span>
                  </div>
                </>
              )}
              {isFinalizing && (
                <>
                  <div className="flex items-center gap-2 mt-4">
                    <VotesIcon width={20} height={20} />
                    <span className="text-white text-lg">
                      Votes: {proposalData?.votesFinal.length ?? 0}/
                      {proposalData.votesNeeded}{" "}
                      <b>
                        (
                        {reachedVotesForFinalizing
                          ? "Reached Final Votes✅"
                          : "Not Reached Final Votes⏳"}
                        )
                      </b>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <VotesIcon width={20} height={20} />
                    <span className="text-white text-lg">
                      Votes Deny: {finalizingDenyVotesForProposal.length ?? 0}/
                      {proposalData.votesNeeded}{" "}
                      <b>({reachedDenyVotesForFinalizing && "Denied 🟥"})</b>
                    </span>
                  </div>
                </>
              )}
              <div className="flex items-center gap-2 mt-4">
                <DurationIcon width={20} height={20} />
                <span className="text-white text-lg">
                  Duration: {moment(proposalData.duration).fromNow()}
                </span>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white">Description</h3>
                <p className="text-white mt-2">{proposalData.description}</p>
              </div>
              {proposalData.contentHash.startsWith("Q") && (
                <div className="mt-6">
                  <a
                    className="text-xl font-bold  animate-pulse text-[#00FFFF]"
                    href={`https://ipfs.alienworlds.io/ipfs/${proposalData.contentHash}`}
                    target="_blank"
                  >
                    Documentation
                  </a>
                </div>
              )}
              {!canStartWork && (
                <>
                  {canVote &&
                    (!reachedVotes ||
                      (isFinalizing && !reachedVotesForFinalizing)) && (
                      <CustodiansVoteOptions
                        status={proposalData.status}
                        handleVoteProposal={handleVoteProposal}
                      />
                    )}

                  {isArbiter && !isAproved && (
                    <ArbiterVoteOptions proposalId={proposalData.id} voting={isVoting}/>
                  )}
                </>
              )}
              {canStartWork && (
                <div className="flex justify-center mt-6">
                  <Button
                    state="completed"
                    size="fat"
                    onClick={handleStartWorkProposal}
                  >
                    Start Work
                  </Button>
                </div>
              )}
              {canCompleteWork && (
                <div className="flex justify-center mt-6">
                  <Button
                    state="completed"
                    size="fat"
                    onClick={handleCompleteWorkProposal}
                  >
                    Complete Work
                  </Button>
                </div>
              )}
              {canFinalizeInCompleted && (
                <div className="flex justify-center mt-6">
                  <Button
                    state="completed"
                    size="fat"
                    onClick={handleFinalizeWorkProposal}
                  >
                    Finalize Proposal
                  </Button>
                </div>
              )}
              {canDispute && (
                <div className="flex justify-center mt-6">
                  <Button
                    state="warning"
                    size="fat"
                    onClick={handleDisputeWorkProposal}
                  >
                    Dispute Proposal
                  </Button>
                </div>
              )}
              {canArbiterInDispute && (
                // approve or reject
                <div className="flex justify-center mt-6 gap-3">
                  <Button
                    state="completed"
                    size="fat"
                    onClick={() => {
                      handleArbiterDisputeWorkProposal("approve");
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    state="danger"
                    size="fat"
                    onClick={() => {
                      handleArbiterDisputeWorkProposal("deny");
                    }}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    </Modal>
  );
};
