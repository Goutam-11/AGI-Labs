import { createConfig, EVM, type QuoteRequest,convertQuoteToRoute, executeRoute, getQuote } from '@lifi/sdk'
import type { Chain } from 'viem'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import {
  arbitrum, mainnet, optimism, polygon, scroll, base,
} from 'viem/chains';

type Props = {
  fromChain: {
    chainId: number,
    tokenAddress: string
  },
  toChain: {
    chainId: number,
    tokenAddress: string
  },
  amount: string
}

export const lifiBridge = async ({ fromChain, toChain,amount }: Props) => {
  
  if (!process.env.EVM_PRIVATE_KEY) return "Your evm wallet private key is missing."
  // if(!process.env.SUI_PRIVATE_KEY) return "Your sui wallet private key is missing."
  
  const account = privateKeyToAccount(process.env.EVM_PRIVATE_KEY as `0x${string}`)
  
  const chains = [arbitrum, mainnet, optimism, polygon, scroll,base]
  
  const client = createWalletClient({
    account,
    chain: mainnet,
    transport: http(),
  })
  
  createConfig({
    integrator: 'LIFI SDK',
    providers: [
      EVM({
        getWalletClient: async () => client,
        switchChain: async (chainId) =>
          // Switch chain by creating a new wallet client
          createWalletClient({
            account,
            chain: chains.find((chain) => chain.id == chainId) as Chain,
            transport: http(),
          }),
      }),
      // Sui({
      //   getWallet: async () => client,
        
      // })
    ],
  })
  
  const fromAddress = process.env.WALLET_ADDRESS || "";
  
  const quoteRequest: QuoteRequest = {
    fromChain: fromChain.chainId, // Arbitrum
    toChain: toChain.chainId, // Optimism
    fromToken: fromChain.tokenAddress, // USDC on Arbitrum
    toToken: toChain.tokenAddress, // DAI on Optimism
    fromAmount: amount, // 10 USDC
    // The address from which the tokens are being transferred.
    fromAddress: fromAddress, 
  };
  
  const quote = await getQuote(quoteRequest);
  
  const route = convertQuoteToRoute(quote)
  
  const executedRoute = await executeRoute(route, {
    // Gets called once the route object gets new updates
    updateRouteHook(route) {
      console.log(route)
    },
  })
  return `Route executed: ${executedRoute}`
}