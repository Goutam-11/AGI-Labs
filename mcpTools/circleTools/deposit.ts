import {
  createPublicClient,
  getContract,
  http,
  erc20Abi,
} from "viem";
import {
  account,
  chainConfigs,
  parseSelectedChains,
  GATEWAY_WALLET_ADDRESS,
} from "./config.js";


// Gateway Wallet ABI (minimal - only deposit function)
const gatewayWalletAbi = [
  {
    type: "function",
    name: "deposit",
    inputs: [
      { name: "token", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

type DepositParams = {
  chains: string[];
  depositAmount: bigint;
};

export async function depositToGatewayWallet({
  chains,
  depositAmount,
}: DepositParams): Promise<string> {

  const selectedChains = parseSelectedChains({ passedChains: chains });

  for (const chainName of selectedChains) {
    const config = chainConfigs[chainName];

    // Create client for current chain
    const client = createPublicClient({
      chain: config.chain,
      transport: http(),
    });

    // Get contract instances
    const usdcContract = getContract({
      address: config.usdcAddress,
      abi: erc20Abi,
      client,
    });

    const gatewayWallet = getContract({
      address: GATEWAY_WALLET_ADDRESS,
      abi: gatewayWalletAbi,
      client,
    });

    // Check USDC balance
    const balance = await usdcContract.read.balanceOf([account.address]);

    if (balance < depositAmount) {
      return "Insufficient USDC balance. Please top up at https://faucet.circle.com";
    }

    try {
      // [1] Approve Gateway Wallet to spend USDC
      const approvalTx = await usdcContract.write.approve(
        [GATEWAY_WALLET_ADDRESS, depositAmount],
        { account },
      );
      await client.waitForTransactionReceipt({ hash: approvalTx });

      // [2] Deposit USDC into Gateway Wallet
      const depositTx = await gatewayWallet.write.deposit(
        [config.usdcAddress, depositAmount],
        { account },
      );
      await client.waitForTransactionReceipt({ hash: depositTx });
      return `Done on ${chainName}. Deposit tx: ${depositTx}`;
    } catch (err) {
      return `Error on ${chainName}: ${err}`;
    }
  }
  return "No chains were processed"
}
   ;
