/**
 * Test file for transferring USDC from Base Sepolia to Monad Testnet
 * Uses Circle's Gateway Protocol with EIP-712 signing (advanced approach)
 */

import { transferFromEVM } from "./transfer_from_evm.js";
import { account } from "./config.js";

async function testTransferBaseSepoliaToMonad() {
  console.log("🔄 Testing Transfer: Base Sepolia → Monad Testnet");
  console.log("=" .repeat(60));

  try {
    // Configuration
    const sourceChains = ["baseSepolia"]; // Can add multiple source chains
    const destinationChain = "monadTestnet";
    const transferAmount = 1_000000n; // 1 USDC (6 decimals)
    const recipientAddress = account.address; // Send to same wallet

    console.log(`\n📊 Transfer Details:`);
    console.log(`   Source Chain(s): ${sourceChains.join(", ")}`);
    console.log(`   Destination: ${destinationChain}`);
    console.log(`   Amount: ${Number(transferAmount) / 1_000000} USDC per chain`);
    console.log(`   Recipient: ${recipientAddress}`);
    console.log(`\n⏳ Step 1: Creating burn intent and signing...`);

    // Execute transfer
    const result = await transferFromEVM({
      chains: sourceChains,
      destinationChain: destinationChain as any,
      transferValue: transferAmount,
      recipientAddress: recipientAddress,
    });

    console.log(`\n✅ Transfer Complete!`);
    console.log(result);
    console.log("\n" + "=".repeat(60));
    console.log("\n💡 Tip: Check your balance on Monad Testnet:");
    console.log(`   Explorer: https://testnet.monadscan.com/address/${recipientAddress}`);

  } catch (error) {
    console.error(`\n❌ Transfer Failed:`);
    console.error(error);
    process.exit(1);
  }
}

// Run the test
testTransferBaseSepoliaToMonad();
