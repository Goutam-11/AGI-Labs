import { privateKeyToAccount } from "viem/accounts";

export async function balanceOfGatewayWallet(): Promise<string> {
  if (!process.env.EVM_PRIVATE_KEY) {
    return "Missing EVM_PRIVATE_KEY in environment";
  }

  const DOMAINS = {
    sepolia: 0,
    avalancheFuji: 1,
    baseSepolia: 6,
    arcTestnet: 26,
    hyperliquidEvmTestnet: 19,
    seiTestnet: 16,
    sonicTestnet: 13,
    worldchainSepolia: 14,
    // monadTestnet: 15,
  };

  const account = privateKeyToAccount(
    process.env.EVM_PRIVATE_KEY as `0x${string}`,
  );
  const depositor = account.address;

  const body = {
    token: "USDC",
    sources: Object.entries(DOMAINS).map(([_, domain]) => ({
      domain,
      depositor,
    })),
  };

  const res = await fetch(
    "https://gateway-api-testnet.circle.com/v1/balances",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    return `Error: API returned status ${res.status}`;
  }

  const result: any = await res.json();
  

  if (!result || !result?.balances || !Array.isArray(result?.balances)) {
    return `Error: Unexpected API response structure. Got: ${JSON.stringify(result)}`;
  }

  const chainBalance: string[] = [];
  let total = 0;
  for (const balance of result?.balances) {
    const chain =
      Object.keys(DOMAINS).find(
        (key) => DOMAINS[key as keyof typeof DOMAINS] === balance.domain,
      ) || `Domain ${balance.domain}`;
    const amount = parseFloat(balance.balance);
    chainBalance.push(`${chain}: ${amount.toFixed(6)} USDC`);
    total += amount;
  }

  return `\n${chainBalance.join("\n")}\nTotal: ${total.toFixed(6)} USDC`;
}


