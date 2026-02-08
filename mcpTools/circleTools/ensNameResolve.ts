import { createEnsPublicClient } from '@ensdomains/ensjs'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
import { normalize } from "viem/ens"

export const getEnsResolverAddress = async (ensName: string) => {
  const client = createEnsPublicClient({
    chain: mainnet,
    transport: http(),
  })

  const ensResolver = await client.getResolver({
    name: normalize('nick.eth'),
  })
  if(!ensResolver) {
    return `No resolver found for ${ensName} output: ${ensResolver}`
  }

  return `The resolver address for ${ensName} is ${ensResolver}`
}