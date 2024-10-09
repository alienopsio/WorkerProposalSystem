"use client";

import { useContext } from "react";
import { ConfigsContext } from "../context/ConfigContext";

export const useConfig = () => {
  const context = useContext(ConfigsContext);
  const { configs } = context;
  const firstConfigRow = configs[0];
  const config = {
    approval_duration: firstConfigRow.data.find(
      (config) => config.key === "approval_duration"
    )?.value[0],
    finalize_threshold: firstConfigRow.data.find(
      (config) => config.key === "finalize_threshold"
    )?.value[0],
    min_proposal_duration: firstConfigRow.data.find(
      (config) => config.key === "min_proposal_duration"
    )?.value[0],
    proposal_threshold: firstConfigRow.data.find(
      (config) => config.key === "proposal_threshold"
    )?.value[0],
  };
  return config;
};
