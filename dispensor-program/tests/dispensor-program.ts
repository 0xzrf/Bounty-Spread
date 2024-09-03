import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { DispenserProgram } from "../target/types/dispenser_program";
import { Keypair, PublicKey, Signer, SystemProgram } from "@solana/web3.js";
import { assert, expect } from 'chai';
import { BN } from "@coral-xyz/anchor";


describe("dispenser_program", () => {
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

    const winner1 = new Keypair();
    const winner2 = new Keypair();

    // Generate some winner public keys and prizes
    const winners = [
      winner1.publicKey, 
      winner2.publicKey
    ];
    const prizes: anchor.BN[] = [
      new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL), // 1 SOL
      new anchor.BN(2 * anchor.web3.LAMPORTS_PER_SOL), // 2 SOL
    ];
    const beforeHostalance = await provider.connection.getBalance(host.publicKey)
    // Calculate the escrow PDA
    const [escrowPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("escrow"), host.publicKey.toBuffer()],
      program.programId
    );
    const [vaultPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("escrow_vault"),host.publicKey.toBuffer()],
      program.programId
    );

    const beforeEscrowBalance = await provider.connection.getBalance(vaultPda)
    console.log("Before Host Balance", beforeHostalance/ anchor.web3.LAMPORTS_PER_SOL)
    console.log("Before escrow vault Balance", beforeEscrowBalance/ anchor.web3.LAMPORTS_PER_SOL)
    
    // Execute the initialize_escrow instruction
    await program.methods.initializeEscrow(winners, prizes)
      .accountsStrict({
        host: host.publicKey,
        escrow: escrowPda,
        escrowVault: vaultPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([host])
      .rpc();
      console.log("--------------------------------------------------")
      const afterHostalance = await provider.connection.getBalance(host.publicKey)
      const afterEscrowBalance = await provider.connection.getBalance(vaultPda)
      console.log("Before Host Balance", afterHostalance/ anchor.web3.LAMPORTS_PER_SOL)
      console.log("Before escrow vault Balance", afterEscrowBalance/ anchor.web3.LAMPORTS_PER_SOL)
      console.log("--------------------------------------------------")

    // Fetch the escrow account
    const escrowAccount = await program.account.escrow.fetch(escrowPda);
    // checks if the balance changes after initializeEscrow instruction
    console.log(parseInt((beforeHostalance).toString()) - parseInt((afterHostalance).toString()), parseInt((afterEscrowBalance).toString()) -parseInt((beforeEscrowBalance).toString())  )
    
    const beforeWinner1Balance =await  provider.connection.getBalance(winner1.publicKey)

    console.log("Initial Escrow balance: ", afterEscrowBalance/ anchor.web3.LAMPORTS_PER_SOL)
    console.log("Initial  winner balane ", beforeWinner1Balance)

    await program.methods.withdrawPrize(winner1.publicKey)
    .accountsStrict({
      escrow: escrowPda,
      escrowVault: vaultPda,
      winner: winner1.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    })
    .signers([winner1])
    .rpc();
    console.log("--------------------------------------------------")
    
    const afterWinner1Balance = await provider.connection.getBalance(winner1.publicKey)
    const  afterEscrowBalancee = await provider.connection.getBalance(vaultPda)


    console.log("After Escrow balance: ", afterEscrowBalancee/ anchor.web3.LAMPORTS_PER_SOL)
    console.log("after winner balance ", afterWinner1Balance/ anchor.web3.LAMPORTS_PER_SOL)
    console.log("--------------------------------------------------")

  });

});
