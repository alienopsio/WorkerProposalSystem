import { LogInLink } from "./login-link";
import { useAuth } from "../../hook/useAuth";
import { Button } from "../generic/buttons/button";
import { useState } from "react";
import { VisitorInfo } from "./visitor-info";
import { CreateProposalModal } from "../modals/create-proposal.modal";

export default function Navbar() {
  const { activeUserData } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  const isVisitor = !activeUserData?.actor;

  return (
    <>
      <div className="flex bg-white text-black justify-between items-center py-1 px-8">
        <VisitorInfo />
        <div className="flex flex-row-reverse gap-2 min-w-[360px]">
          <LogInLink />
          {!isVisitor && <Button state="dark" onClick={toggleModal}>Create Proposal</Button>}
          <CreateProposalModal open={open} onClose={toggleModal} />
        </div>
      </div>
    </>
  );
}
