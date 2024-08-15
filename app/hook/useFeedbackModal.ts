"use client";

import { useContext } from "react";
import {
  FeedbackModalContext,
  StatusMessageOption,
} from "../context/FeedbackModalContext";

export const useFeedbackModal = () => {
  const context = useContext(FeedbackModalContext);
  const { setShow, setStatus } = context;

  const handleShowFeedbackModal = (
    show: boolean,
    status: StatusMessageOption
  ) => {
    setShow(show);
    setStatus(status);
  };

  return { handleShowFeedbackModal };
};
