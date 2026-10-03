"use client";

import { useEffect, useState } from "react";
import { Name } from "@wharfkit/antelope";
import { useAuth } from "./useAuth";

export type EscrowGate = "loading" | "missing" | "unlocked" | "locked" | "unavailable";

/**
 * Read-only. Does not submit an escrow transaction.
 * Locked means the escrow row exists and `disputed` is set, which is the
 * contract's lock flag for an arbiter ruling.
 */
export function useEscrowLock(
  dacScope: string | undefined,
  proposalKey: string | undefined,
  enabled: boolean
) {
  const { activeUserData } = useAuth();
  const [gate, setGate] = useState<EscrowGate>(enabled ? "loading" : "unavailable");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!enabled || !activeUserData || !dacScope || !proposalKey) {
        if (!cancelled) setGate("unavailable");
        return;
      }

      try {
        const result = await activeUserData.client.v1.chain.get_table_rows({
          code: "escrw.worlds",
          scope: dacScope,
          table: "escrows",
          lower_bound: Name.from(proposalKey),
          limit: 1,
        });
        const row = result.rows.find(
          (entry) => String(entry.key) === String(proposalKey)
        );
        if (cancelled) return;
        if (!row) {
          setGate("missing");
          return;
        }
        const locked = row.disputed === true || row.disputed === 1;
        setGate(locked ? "locked" : "unlocked");
      } catch {
        if (!cancelled) setGate("unavailable");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [activeUserData, dacScope, proposalKey, enabled]);

  return gate;
}
