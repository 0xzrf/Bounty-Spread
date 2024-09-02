import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { DispenserProgram } from "../target/types/dispenser_program";
import { Keypair, PublicKey, Signer, SystemProgram } from "@solana/web3.js";
import { assert, expect } from 'chai';
import { BN } from "@coral-xyz/anchor";


describe("escrow_program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DispenserProgram as Program<DispenserProgram>;

  it("Initializes the escrow", async () => {
    const host = anchor.web3.Keypair.generate();
    
    // Airdrop some SOL to the host
    const airdropSignature = await provider.connection.requestAirdrop(
      host.publicKey,
      4 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropSignature);

    // Generate some winner public keys and prizes
    const winners = [
      new Keypair().publicKey,
      new Keypair().publicKey
    ];
    const prizes: anchor.BN[] = [
      new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL), // 1 SOL
      new anchor.BN(2 * anchor.web3.LAMPORTS_PER_SOL), // 2 SOL
    ];
    const beforeHostalance = provider.connection.getBalance(host.publicKey)
    // Calculate the escrow PDA
    const [escrowPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("escrow"), host.publicKey.toBuffer()],
      program.programId
    );
    const beforeEscrowBalance = provider.connection.getBalance(escrowPda)

    // Execute the initialize_escrow instruction
    await program.methods.initializeEscrow(winners, prizes)
      .accountsStrict({
        host: host.publicKey,
        escrow: escrowPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([host])
      .rpc();

      const afterHostalance = provider.connection.getBalance(host.publicKey)
      const afterEscrowBalance = provider.connection.getBalance(escrowPda)

    // Fetch the escrow account
    const escrowAccount = await program.account.escrow.fetch(escrowPda);
    // checks if the balance changes after initializeEscrow instruction
    console.log(parseInt((await beforeHostalance).toString()) -parseInt((await afterHostalance).toString()), parseInt((await afterEscrowBalance).toString()) -parseInt((await beforeEscrowBalance).toString())  )

  });


  it("Withdraws from the funcs", async () => {
    const host = anchor.web3.Keypair.generate();
    
    // Airdrop some SOL to the host
    const airdropSignature = await provider.connection.requestAirdrop(
      host.publicKey,
      4 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropSignature);

    const winner1 = new Keypair()
    const winner2 = new Keypair()

    // Generate some winner public keys and prizes
    const winners = [
      winner1.publicKey,
      winner2.publicKey
    ];
    const prizes: anchor.BN[] = [
      new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL), // 1 SOL
      new anchor.BN(2 * anchor.web3.LAMPORTS_PER_SOL), // 2 SOL
    ];
    // Calculate the escrow PDA
    const [escrowPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("escrow"), host.publicKey.toBuffer()],
      program.programId
    );

    // Execute the initialize_escrow instruction
    await program.methods.initializeEscrow(winners, prizes)
      .accountsStrict({
        host: host.publicKey,
        escrow: escrowPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([host])
      .rpc();


      const winnerInitialBalance = provider.connection.getBalance(winner1.publicKey)
      const beforeEscrowBal = provider.connection.getBalance(escrowPda)
      await program.methods.withdrawPrize(winner1.publicKey)
      .accountsStrict({
        winner: winner1.publicKey,
        escrow: escrowPda,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .signers([winner1])
      .rpc()
      const winnerAfterBalance = provider.connection.getBalance(winner1.publicKey)
      const afterEscrowBal = provider.connection.getBalance(escrowPda)
      

      console.log(parseInt((await beforeEscrowBal).toString()) -parseInt((await afterEscrowBal).toString()), parseInt((await winnerAfterBalance).toString()) -parseInt((await winnerInitialBalance).toString())  )


  }); 



});
