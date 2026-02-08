/**
 * Test file for depositing USDC to Gateway Wallet on Monad Testnet
 * This must be done before transferring
 */

import { depositToGatewayWallet } from "./deposit.js";

async function testDepositOnMonad() {
  console.log("💰 Testing Deposit: Monad Testnet → Gateway Wallet");
  console.log("=" .repeat(60));

  try {
    // Configuration
    const chains = ["monadTestnet"];
    const depositAmount = 1_000000n; // 5 USDC (6 decimals)

    console.log(`\n📊 Deposit Details:`);
    console.log(`   Chain(s): ${chains.join(", ")}`);
    console.log(`   Amount: ${Number(depositAmount) / 1_000000} USDC per chain`);
    console.log(`\n⏳ Step 1: Checking USDC balance...`);
    console.log(`⏳ Step 2: Approving Gateway Wallet...`);
    console.log(`⏳ Step 3: Depositing to Gateway Wallet...`);

    // Execute deposit
    const result = await depositToGatewayWallet({
      chains: chains,
      depositAmount: depositAmount,
    });

    console.log(`\n✅ Deposit Complete!`);
    console.log(result);
    console.log("\n" + "=".repeat(60));
    console.log("\n💡 Next Steps:");
    console.log("   1. Run testTransferToMonad.ts to transfer from Monad to another chain");
    console.log("   2. Or run balance check to verify deposit");

  } catch (error) {
    console.error(`\n❌ Deposit Failed:`);
    console.error(error);

    if (error instanceof Error && error.message.includes("Insufficient")) {
      console.log("\n💡 Get testnet USDC:");
      console.log("   Faucet: https://faucet.circle.com");
      console.log("   Select Monad Testnet and request tokens");
    }

    process.exit(1);
  }
}

// Run the test
testDepositOnMonad();
