import { createEnsPublicClient } from '@ensdomains/ensjs'
import { http } from 'viem'
import { mainnet } from 'viem/chains' // Change from mainnet to base

export const getEnsName = async (ensAddress: string) => {
  const client = createEnsPublicClient({
    chain: mainnet,
    transport: http(),
  })

  const ensName = await client.getName({
    address: ensAddress as `0x${string}`,
  })
 
  if(!ensName || !ensName.name) {
    return `No ens primary name set for ${ensAddress} output: ${JSON.stringify(ensName)}`
  }
  return `Ens name for the address: ${ensAddress} is ${ensName.name}`
  
}
