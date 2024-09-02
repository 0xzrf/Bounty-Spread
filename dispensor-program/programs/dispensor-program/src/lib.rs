use anchor_lang::prelude::*;

declare_id!("5dT5GSyajUuXDMbcy3hswP53XEQYrSuCjJUhAp4sCVo9");

use anchor_lang::solana_program::hash::{hash, Hash};

#[program]
pub mod escrow_program {
    use super::*;

    pub fn initialize_escrow(
        ctx: Context<InitializeEscrow>,
        hashed_winners: Vec<[u8; 32]>,
        prizes: Vec<u64>,
    ) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;

        require!(
            hashed_winners.len() == prizes.len(),
            ErrorCode::MismatchedPrizesAndWinners
        );

        escrow.host = *ctx.accounts.host.key;
        escrow.hashed_winners = hashed_winners;
        escrow.prizes = prizes.clone();
        escrow.total_amount = prizes.iter().sum(); 

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.host.key(),
            &ctx.accounts.escrow.key(),
            escrow.total_amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.host.to_account_info(),
                ctx.accounts.escrow.to_account_info(),
            ],
        )?;

        Ok(())
    }

    pub fn withdraw_prize(ctx: Context<WithdrawPrize>, winner_pubkey: Pubkey) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;

        let winner_hash = hash(winner_pubkey.as_ref());

      
        let winner_index = escrow
            .hashed_winners
            .iter()
            .position(|&h| h == winner_hash.to_bytes())
            .ok_or(ErrorCode::Unauthorized)?;

        // Get the prize amount for the winner
        let prize_amount = escrow.prizes[winner_index];

        // Check if the prize has already been withdrawn (assuming we mark withdrawn with 0)
        require!(prize_amount > 0, ErrorCode::PrizeAlreadyClaimed);

        // Transfer prize amount to the winner
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.escrow.key(),
            &ctx.accounts.winner.key(),
            prize_amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.escrow.to_account_info(),
                ctx.accounts.winner.to_account_info(),
            ],
        )?;

        // Mark the prize as claimed by setting it to 0
        escrow.prizes[winner_index] = 0;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeEscrow<'info> {
    #[account(mut)]
    pub host: Signer<'info>,
    #[account(init, payer = host, space = 8 + 32 + (32 * 10) + (8 * 10) + 8)] // Adjust space for hashes and prizes
    pub escrow: Account<'info, Escrow>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct WithdrawPrize<'info> {
    #[account(mut, has_one = host)]
    pub escrow: Account<'info, Escrow>,
    #[account(mut)]
    pub winner: Signer<'info>,
}

#[account]
pub struct Escrow {
    pub host: Pubkey,
    pub hashed_winners: Vec<[u8; 32]>, 
    pub prizes: Vec<u64>, 
    pub total_amount: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized: Caller is not one of the selected winners.")]
    Unauthorized,
    #[msg("Mismatched number of prizes and winners.")]
    MismatchedPrizesAndWinners,
    #[msg("The prize has already been claimed.")]
    PrizeAlreadyClaimed,
}
