import SessionKit, { Chains } from "@wharfkit/session";
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor";
import { WalletPluginCloudWallet } from "@wharfkit/wallet-plugin-cloudwallet";

const appName = "wps-app";
const chain = Chains.WAX;

export async function createSessionKit() {
  if (typeof document === "undefined") {
    throw new Error("WharfKit requires a browser environment.");
  }

  const { WebRenderer } = await import("@wharfkit/web-renderer");
  const ui = new WebRenderer();

  const walletPlugins = [
    new WalletPluginAnchor(),
    new WalletPluginCloudWallet(),
  ];

  const newSessionKit = new SessionKit({
    appName,
    chains: [chain],
    ui,
    walletPlugins,
  });

  return newSessionKit;
}
