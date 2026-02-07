// Import Bridge Kit and its dependencies
import type { BridgeChainIdentifier } from "@circle-fin/bridge-kit";
import { BridgeKit } from "@circle-fin/bridge-kit";
import { createViemAdapterFromPrivateKey } from "@circle-fin/adapter-viem-v2";
import { inspect } from "util";

interface BridgeKitOptions {
  sourceChainName: BridgeChainIdentifier;
  destinationChainName: BridgeChainIdentifier;
  amount: string;
}


export const bridgeUSDC = async ({
  sourceChainName,
  destinationChainName,
  amount
}: BridgeKitOptions): Promise<string> => {
  try {
    // Initialize the SDK
    const kit = new BridgeKit();
    // Initialize the adapter which lets you transfer tokens from your wallet on any EVM-compatible chain
    const adapter = createViemAdapterFromPrivateKey({
      privateKey: process.env.EVM_PRIVATE_KEY as string,
    });
    console.log("amount", amount);
    // Use the same adapter for the source and destination blockchains
    const result = await kit.bridge({
      from: { adapter, chain: sourceChainName },
      to: { adapter, chain: destinationChainName },
      amount: amount,
    });

    return `RESULT: ${inspect(result, false, null, true)}`
  } catch (err) {
    return `RESULT: ${inspect(err, false, null, true)}`
  }
};
