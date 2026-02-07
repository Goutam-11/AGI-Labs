import { type Address } from "viem";
import {
  sepolia,
  baseSepolia,
  avalancheFuji,
  arcTestnet,
  hyperliquidEvmTestnet,
  seiTestnet,
  sonicTestnet,
  worldchainSepolia,
  // monadTestnet
} from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

/* Account Setup */
if (!process.env.EVM_PRIVATE_KEY) {
  throw new Error("EVM_PRIVATE_KEY not set in environment");
}
export const account = privateKeyToAccount(
  process.env.EVM_PRIVATE_KEY as `0x${string}`,
);

/* Gateway Contract Addresses */
export const GATEWAY_WALLET_ADDRESS: Address =
  "0x0077777d7EBA4688BDeF3E311b846F25870A19B9";
export const GATEWAY_MINTER_ADDRESS: Address =
  "0x0022222ABE238Cc2C7Bb1f21003F0a260052475B";

/* Chain Configuration */

export const chainConfigs = {
  sepolia: {
    chain: sepolia,
    usdcAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" as Address,
    domainId: 0,
  },
  baseSepolia: {
    chain: baseSepolia,
    usdcAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as Address,
    domainId: 6,
  },
  avalancheFuji: {
    chain: avalancheFuji,
    usdcAddress: "0x5425890298aed601595a70ab815c96711a31bc65" as Address,
    domainId: 1,
  },
  arcTestnet: {
    chain: arcTestnet,
    usdcAddress: "0x3600000000000000000000000000000000000000" as Address,
    domainId: 26,
  },
  hyperliquidEvmTestnet: {
    chain: hyperliquidEvmTestnet,
    usdcAddress: "0x2B3370eE501B4a559b57D449569354196457D8Ab" as Address,
    domainId: 19,
  },
  seiTestnet: {
    chain: seiTestnet,
    usdcAddress: "0x4fCF1784B31630811181f670Aea7A7bEF803eaED" as Address,
    domainId: 16,
  },
  sonicTestnet: {
    chain: sonicTestnet,
    usdcAddress: "0x0BA304580ee7c9a980CF72e55f5Ed2E9fd30Bc51" as Address,
    domainId: 13,
  },
  worldchainSepolia: {
    chain: worldchainSepolia,
    usdcAddress: "0x66145f38cBAC35Ca6F1Dfb4914dF98F1614aeA88" as Address,
    domainId: 14,
  },
  // monadTestnet: {
  //   chain: monadTestnet,
  //   usdcAddress: "0x534b2f3A21130d7a60830c2Df862319e593943A3" as Address,
  //   domainId: 15,
  // }
} as const;

export type ChainKey = keyof typeof chainConfigs;
export enum chains {
  sepolia = "sepolia",
  baseSepolia = "baseSepolia",
  avalancheFuji = "avalancheFuji",
  arcTestnet = "arcTestnet",
  hyperliquidEvmTestnet = "hyperliquidEvmTestnet",
  seiTestnet = "seiTestnet",
  sonicTestnet = "sonicTestnet",
  worldchainSepolia = "worldchainSepolia",
  // monadTestnet = "monadTestnet"
};


/* CLI Argument Parsing Helper */
export function parseSelectedChains({
  passedChains = []
}: {
  passedChains: string[];
}): ChainKey[] {
  const chains = passedChains;
  const validChains = Object.keys(chainConfigs) as ChainKey[];

  if (chains.length === 0) {
    return [];
  }

  if (chains.length === 1 && chains[0] === "all") {
    return validChains;
  }

  const invalid = chains.filter((c) => !validChains.includes(c as ChainKey));
  if (invalid.length > 0) {
    return [];

  }

  return [...new Set(chains)] as ChainKey[];
}