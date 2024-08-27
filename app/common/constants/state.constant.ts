enum PROPOSAL_STATE_ENUM {
  STATE_PENDING_APPROVAL = "pendingappr",
  STATE_HAS_ENOUGH_APP_VOTES = "apprvtes",
  STATE_IN_PROGRESS = "inprogress",
  STATE_PENDING_FINALIZE = "pendingfin",
  STATE_HAS_ENOUGH_FIN_VOTES = "apprfinvtes",
  STATE_EXPIRED = "expired",
  STATE_DISPUTED = "indispute",
}

enum CARD_STATUS_ENUM {
  ALL_PROPOSALS = "all_proposals",
  VOTING = "voting",
  IN_PROGRESS = "in_progress",
  FINALIZING = "finalizing",
  COMPLETED = "completed",
  IN_DISPUTE = "in_dispute",
  REJECTED = "rejected",
  EXPIRED = "expired",
}

export { PROPOSAL_STATE_ENUM, CARD_STATUS_ENUM };
