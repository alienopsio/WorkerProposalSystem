import { Button } from "../../generic/buttons/button";

export const CustodiansVoteOptions = ({
  handleVoteProposal,
  status,
}: {
  handleVoteProposal: (vote: string) => void;
  status: string;
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button
            state="warning"
            size="fat"
            onClick={() => handleVoteProposal("approve")}
          >
            <b>VOTE YES!</b>
          </Button>
          <Button
            state="danger"
            size="fat"
            onClick={() => handleVoteProposal("deny")}
          >
            <b>VOTE NO...</b>
          </Button>
        </div>
        <Button
          state="muted"
          size="fat"
          onClick={() => handleVoteProposal("abstain")}
        >
          <b>Abstain on this proposal</b>
        </Button>
      </div>
    </>
  );
};
