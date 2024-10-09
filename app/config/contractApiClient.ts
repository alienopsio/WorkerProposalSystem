import { APIClient } from "@wharfkit/session";

export const contractApiClient = new APIClient({
  url: process.env.NEXT_PUBLIC_RPC_ENDPOINT,
});
