import { createEnsPublicClient } from '@ensdomains/ensjs'
import { http } from 'viem'
import { mainnet } from 'viem/chains'
import { normalize } from "viem/ens"

export const getEnsResolverAddress = async (ensName: string) => {
  const client = createEnsPublicClient({
    chain: mainnet,
    transport: http(),
  })

  const ensResolver = await client.getAddressRecord({
    name: normalize(ensName),
    // coinType: 2147492101,
  })
  if(!ensResolver || !ensResolver.value) {
    return `No resolver found for ${ensName} output: ${ensResolver?.value} and ${JSON.stringify(ensResolver)}`
  }

  return `The resolver address for ${ensName} is ${ensResolver?.value} and ${JSON.stringify(ensResolver)}`
}

