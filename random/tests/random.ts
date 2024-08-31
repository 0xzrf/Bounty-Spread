import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Random } from "../target/types/random";
import { Keypair, PublicKey, SendTransactionError, Connection } from "@solana/web3.js";
import { assert } from "chai";

describe("random", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.Random as Program<Random>;
  
  // Define key variables
  let creator: Keypair;
  let winner: Keypair;
  let anotherAccount: Keypair;
  let pda: PublicKey;
  let bump: number;
  let connection: Connection;

  // Before all tests, airdrop SOL and derive the PDA
  before(async () => {
    creator = Keypair.generate();
    anotherAccount = Keypair.generate();
    winner = Keypair.generate();
    connection = new Connection("http://localhost:8899")
    
    // Airdrop SOL to the accounts
    await Promise.all([
      program.provider.connection.requestAirdrop(creator.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL)
        .then((tx) => program.provider.connection.confirmTransaction(tx)),
      program.provider.connection.requestAirdrop(winner.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL)
        .then((tx2) => program.provider.connection.confirmTransaction(tx2)),
      program.provider.connection.requestAirdrop(anotherAccount.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL)
        .then((tx3) => program.provider.connection.confirmTransaction(tx3)),
    ]);

    // Derive PDA
    [pda, bump] = await PublicKey.findProgramAddress(
      [Buffer.from("bounty"), creator.publicKey.toBuffer()],
      program.programId
    );

    // Create the bounty
    await program.methods.createBounty(new anchor.BN(10000))
      .accountsStrict({
        creator: creator.publicKey,
        bounty: pda,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .signers([creator])
      .rpc();
  });

  // it("Is initialized!", async () => {
  //   // Fetch the bounty account to check if it was created correctly
  //   const bountyAccount = await program.account.bounty.fetch(pda);
  //   console.log(bountyAccount);

  //   // Assertions to check the bounty account fields
  //   assert.equal(bountyAccount.amount.toNumber(), 100, "Bounty amount should be 100");
  //   assert.equal(bountyAccount.owner.toBase58(), creator.publicKey.toBase58(), "Bounty owner should be the creator");
  //   assert.equal(bountyAccount.claimed, false, "Bounty should not be claimed");
  //   assert.equal(bountyAccount.authorized, false, "Bounty should not be authorized");
  //   assert.isNull(bountyAccount.winner, "Bounty winner should be null");
  // });

  // it("Selects a winner for the bounty", async () => {
  //   // Call the select_winner method
  //   const something = await program.account.bounty.fetch(pda);

  //   await program.methods.selectWinner(winner.publicKey)
  //     .accounts({
  //       bounty: pda,
  //       creator: creator.publicKey,
  //     })
  //     .signers([creator])
  //     .rpc();

  //     const prevOwner = await program.account.bounty.fetch(pda);

  //   // Authorize the transfer
  //   await program.methods.authorizationTransfer()
  //     .accounts({
  //       bounty: pda,
  //       creator: creator.publicKey,
  //     })
  //     .signers([creator])
  //     .rpc();
  //     const nowOwner = await program.account.bounty.fetch(pda);

  //   // Fetch the bounty account to check if the winner was set correctly
  //   const bountyAccount = await program.account.bounty.fetch(pda);
  //   console.log("Owner validity", bountyAccount.owner.toBuffer() == creator.publicKey.toBuffer()  );

  //   // Assertions to check the bounty account fields
  //   assert.isTrue(bountyAccount.authorized, "Bounty should be authorized");
  //   assert.equal(bountyAccount.winner?.toBase58(), winner.publicKey.toBase58(), "Bounty winner should be the selected winner");
  // });

  // it("Fails if non-owner tries to select a winner", async () => {
  //   try {
  //     await program.methods.selectWinner(winner.publicKey)
  //       .accounts({
  //         bounty: pda,
  //         creator: anotherAccount.publicKey,
  //       })
  //       .signers([anotherAccount])
  //       .rpc();
      
  //     assert.fail("Expected error not received");
  //   } catch (err) {
  //     console.log(err.message); // Print the actual error message for debugging
  //     assert.include(err.message, "InvalidOwner", "Expected error message not received");
  //   }
  // });

  // it("Fails if non-owner tries to authorize transfer", async () => {
  //   try {
  //     await program.methods.authorizationTransfer()
  //       .accounts({
  //         bounty: pda,
  //         creator: anotherAccount.publicKey,
  //       })
  //       .signers([anotherAccount])
  //       .rpc();
      
  //     assert.fail("Expected error not received");
  //   } catch (err) {
  //     console.log(err.message); // Print the actual error message for debugging
  //     assert.include(err.message, "InvalidOwner", "Expected error message not received");
  //   }
  // });

  // it("Sets authorized field to true", async () => {
  //   await program.methods.authorizationTransfer()
  //     .accounts({
  //       bounty: pda,
  //       creator: creator.publicKey,
  //     })
  //     .signers([creator])
  //     .rpc();
  
  //   const bountyAccount = await program.account.bounty.fetch(pda);
  //   assert.isTrue(bountyAccount.authorized, "Bounty should be authorized");
  // });
  
  // it("Fails if bounty has already been claimed", async () => {
  //   await program.methods.claimBounty()
  //     .accounts({
  //       bounty: pda,
  //       creator: creator.publicKey,
  //       winner: winner.publicKey,
  //     })
  //     .signers([creator, winner])
  //     .rpc();
  
  //   try {
  //     await program.methods.authorizationTransfer()
  //       .accounts({
  //         bounty: pda,
  //         creator: creator.publicKey,
  //       })
  //       .signers([creator])
  //       .rpc();
      
  //     assert.fail("Expected error not received");
  //   } catch (err) {
  //     console.log(err.message); // Print the actual error message for debugging
  //     assert.include(err.message, "AlreadyClaimed", "Expected error message not received");
  //   }
  // });

  // it("Fails if there is no winner", async () => {
  //   try {
  //     await program.methods.authorizationTransfer()
  //       .accounts({
  //         bounty: pda,
  //         creator: creator.publicKey,
  //       })
  //       .signers([creator])
  //       .rpc();
      
  //     assert.fail("Expected error not received");
  //   } catch (err) {
  //     console.log(err); // Print the actual error for debugging
  //     assert.equal(err.error.errorCode.code, 'NoWinner', "Expected error code NoWinner");
  //     assert.equal(err.error.errorCode.number, 6002, "Expected error number 6002");
  //   }
  // });
  
  it("Successfully claims the bounty", async () => {
    const initialCreatorBalance = await program.provider.connection.getBalance(creator.publicKey);
    const initialWinnerBalance = await program.provider.connection.getBalance(winner.publicKey);
    console.log(initialCreatorBalance,"initialCreatorBalance");
    console.log(initialWinnerBalance,"initWinnerBalance");
    // Select a winner and authorize the transfer
    await program.methods.selectWinner(winner.publicKey)
      .accounts({
        bounty: pda,
        creator: creator.publicKey,
      })
      .signers([creator])
      .rpc();
  
    await program.methods.authorizationTransfer()
      .accounts({
        bounty: pda,
        creator: creator.publicKey,
      })
      .signers([creator])
      .rpc();
  
    // Claim the bounty
    try {
      const tx = await program.methods.claimBounty()
        .accountsStrict({
          bounty: pda,
          creator: creator.publicKey,
          winner: winner.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([creator, winner])
        .rpc();
      
      console.log(`Transaction signature: ${tx}`);
      
      await program.provider.connection.confirmTransaction(tx, 'confirmed');
    } catch (err) {
      console.error(`Transaction failed: ${err}`);
    }
  
    // Fetch the bounty account to check if it was claimed
    const bountyAccount = await program.account.bounty.fetch(pda);
     // Get final balances
     const finalCreatorBalance = await program.provider.connection.getBalance(creator.publicKey);
     const finalWinnerBalance = await program.provider.connection.getBalance(winner.publicKey);
     console.log(initialCreatorBalance - finalCreatorBalance == finalWinnerBalance - initialWinnerBalance )
  });
  
});
