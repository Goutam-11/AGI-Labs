/**
 * Test file for bridging USDC from Base Sepolia to Monad Testnet
 * Uses Circle's BridgeKit SDK (simpler approach)
 */

import { BridgeChain } from "@circle-fin/bridge-kit";
import { bridgeUSDC } from "./bridgeKit.js";

async function testBridgeBaseSepoliaToMonad() {
  console.log("🌉 Testing Bridge: Base Sepolia → Monad Testnet");
  console.log("=" .repeat(60));

  try {
    // Configuration
    const sourceChain = BridgeChain.Base_Sepolia;
    const destinationChain = BridgeChain.Monad_Testnet;
    const amount = "1"; // 1 USDC (6 decimals)

    console.log(`\n📊 Bridge Details:`);
    console.log(`   Source: ${sourceChain}`);
    console.log(`   Destination: ${destinationChain}`);
    console.log(`   Amount: ${parseFloat(amount) / 1} USDC`);
    console.log(`\n⏳ Initiating bridge transaction...`);

    // Execute bridge
    const result = await bridgeUSDC({
      sourceChainName: sourceChain,
      destinationChainName: destinationChain,
      amount: amount,
    });

    console.log(`\n✅ Bridge Result:`);
    console.log(result);
    console.log("\n" + "=".repeat(60));

  } catch (error) {
    console.error(`\n❌ Bridge Failed:`);
    console.error(error);
    process.exit(1);
  }
}

// Run the test
testBridgeBaseSepoliaToMonad();
