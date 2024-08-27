"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { Button } from "../components/generic/buttons/button";
import Image from "next/image";

interface FeedbackModalContextData {
  show: boolean;
  status: StatusMessageOption;
  setShow: (show: boolean) => void;
  setStatus: (status: StatusMessageOption) => void;
}

export const FeedbackModalContext = createContext(
  {} as FeedbackModalContextData
);

type FeedbackModalProviderProps = {
  children: ReactNode;
};

export type StatusMessageOption = {
  message: string;
  type: "success" | "error" | "warning";
};

export const FeedbackModalProvider = ({
  children,
}: FeedbackModalProviderProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusMessageOption>({
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla hendrerit dolor tellus. Aliquam porttitor urna eu purus placerat.",
    type: "success",
  });

  const colorsByType = {
    success: "white",
    error: "red",
    warning: "white",
  };

  const textColorsByType = {
    success: "black",
    error: "white",
    warning: "black",
  };

  const buttonStateByType = {
    success: "dark",
    error: "light",
    warning: "dark",
  };

  return (
    <FeedbackModalContext.Provider value={{ show, setShow, status, setStatus }}>
      {children}
      <Modal
        open={show}
        onClose={() => setShow(false)}
        center
        styles={{
          modal: {
            borderRadius: "1rem",
            padding: "3rem",
            width: "100%",
            maxWidth: "400px",
            paddingBlock: "2rem",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colorsByType[status.type],
            color: textColorsByType[status.type],
          },
          closeButton: {
            display: "none",
          },
        }}
      >
        <div className="flex flex-col justify-center items-center gap-2  overflow-hidden">
          <Image
            src={`/images/aw_wp-icon-${status.type}.svg`}
            width={150}
            height={150}
            alt={`Image of ${status.type} status`}
          />
          <h1 className={`font-semibold text-3xl uppercase`}>{status.type}</h1>
          <p className="text-center max-w-[300px]">{status.message}</p>
          <Button
            state={buttonStateByType[status.type]}
            size="full"
            onClick={() => setShow(false)}
          >
            OK
          </Button>
        </div>
      </Modal>
    </FeedbackModalContext.Provider>
  );
};
