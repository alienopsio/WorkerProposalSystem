const CHAIN_ERRORS: { code: string; message: string }[] = [
  {
    code: "ERR::ESCROW_ACTIVE",
    message: "Escrow is still active, so this action cannot run.",
  },
  {
    code: "ERR::PROPOSAL_NOT_EXPIRED",
    message: "The proposal has not reached the contract expiry yet.",
  },
  {
    code: "ERR::ESCROW_NOT_EXPIRED",
    message: "The escrow has not expired yet.",
  },
  {
    code: "ERR::ESCROW_DISPUTED",
    message: "The escrow is disputed, so this action cannot run.",
  },
  {
    code: "ERR::PROP_NOT_IN_DISPUTE_STATE",
    message: "The proposal is not in dispute.",
  },
  {
    code: "ERR::ESCROW_NOT_FOUND",
    message: "No escrow was found for this proposal.",
  },
  {
    code: "ERR::ESCROW_IS_NOT_LOCKED",
    message:
      "The escrow is not locked. The arbiter can rule only while it is locked.",
  },
  {
    code: "ERR::VOTEPROP_INVALID_CUSTODIAN",
    message: "This account is not an authorized custodian for the vote.",
  },
];

export function mapChainError(raw: string | undefined): string {
  const text = raw?.trim() || "An error occurred";
  const hit = CHAIN_ERRORS.find((entry) => text.includes(entry.code));
  return hit ? hit.message : text;
}

export function isEscrowAuthFailure(raw: string | undefined): boolean {
  const text = (raw ?? "").toLowerCase();
  return (
    text.includes("unsatisfied authorization") ||
    text.includes("missing authority") ||
    text.includes("does not satisfy declared authorizations")
  );
}
