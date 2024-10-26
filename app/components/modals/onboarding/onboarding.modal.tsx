import { useState } from "react";
import Modal from "react-responsive-modal";
import { Button } from "../../generic/buttons/button";

export const OnboardingModal = () => {
  const [openModal, setOpen] = useState(true);
  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <Modal
      open={openModal}
      onClose={toggleModal}
      center
      styles={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        },
        modal: {
          padding: "3rem",
          width: "100%",
          paddingBlock: "2rem",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          boxShadow: "none",
        },
        closeButton: {
          display: "none",
        },
      }}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl">
          What makes a &apos;Good&apos; Proposal?
        </h1>
        <p className="text-xl text-center">
          For new and veteran users, at alienworlds.io we have
          <br />
          created a guide for best practices when creating a<br />
          <b>Worker Proposal</b>. Get to know the DAO you are
          <br />
          requesting funds from and the Arbiters which will
          <br />
          help review and work with your Proposal(s).
        </p>
        <div className="flex flex-col w-full max-w-[430px] gap-1">
          <Button
            state="light"
            onClick={() => open("https://alienworlds.io/workerproposals")}
          >
            AWESOME, I WANT TO CREATE THE BEST PROPOSAL
          </Button>
          <Button state="dark" onClick={() => open("https://wps.alienops.io/documentation")}>TAKE ME TO THE DOCUMENTATION INSTEAD</Button>
        </div>

        <div>
          <span className="cursor-pointer" onClick={toggleModal}>
            I`m familiar with the process, take me to the proposals
          </span>
          <hr className="w-full" />
        </div>
      </div>
    </Modal>
  );
};
