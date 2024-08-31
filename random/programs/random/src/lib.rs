use anchor_lang::prelude::*;

declare_id!("FHAmwQ5qTLVXd1zqU9agC4iG3VigaA8XRGaaQVcUujD9");

#[program]
pub mod random {
    use super::*;

    pub fn create_bounty(ctx: Context<CreateBounty>, amount: u64) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        bounty.amount = amount;
        bounty.owner = *ctx.accounts.creator.key;
        bounty.claimed = false;
        Ok(())
    }

    pub fn select_winner(ctx: Context<SelectWinner>, winner: Pubkey) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        require!(
            bounty.owner == *ctx.accounts.creator.key,
            ErrorCode::InvalidOwner
        );
        require!(!bounty.claimed, ErrorCode::AlreadyClaimed);
        bounty.winner = Some(winner);

        Ok(())
    }

    pub fn authorization_transfer(ctx: Context<AuthorizeTxn>) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        require!(
            bounty.owner == *ctx.accounts.creator.key,
            ErrorCode::InvalidOwner
        );
        require!(!bounty.claimed, ErrorCode::AlreadyClaimed);
        require!(bounty.winner.is_some(), ErrorCode::NoWinner);

        bounty.authorized = true;
        Ok(())
    }

    pub fn claim_bounty(ctx: Context<ClaimBounty>) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        require!(!bounty.claimed, ErrorCode::AlreadyClaimed);
        require!(bounty.authorized, ErrorCode::NonAuthorized);
        require!(bounty.winner.is_some(), ErrorCode::NoWinner);
    
        // Ensure the winner calling this function matches the stored winner
        require!(
            bounty.winner.unwrap() == ctx.accounts.winner.key(),
            ErrorCode::NoWinner
        );
    
        // Transfer the bounty amount from the creator to the winner
        let transfer_instruction = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.creator.key(),
            &ctx.accounts.winner.key(),
            bounty.amount,
        );
    
        anchor_lang::solana_program::program::invoke(
            &transfer_instruction,
            &[
                ctx.accounts.creator.to_account_info(),
                ctx.accounts.winner.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;
    
        bounty.claimed = true;
    
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateBounty<'info> {
    #[account(init, space = 8 + 32 + 8 + 1 + 1 + 33,payer = creator, seeds=[b"bounty",creator.key().as_ref()], bump)]
    pub bounty: Account<'info, Bounty>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SelectWinner<'info> {
    #[account(mut)]
    pub bounty: Account<'info, Bounty>,
    pub creator: Signer<'info>,
}

#[derive(Accounts)]
pub struct AuthorizeTxn<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(mut)]
    pub bounty: Account<'info, Bounty>,
}

#[derive(Accounts)]
pub struct ClaimBounty<'info> {
    #[account(mut)]
    pub bounty: Account<'info, Bounty>,
    /// CHECK: This account is the creator of the bounty and its safety is verified by the program logic`
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(mut)]
    pub winner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Bounty {
    pub owner: Pubkey,
    pub amount: u64,
    pub claimed: bool,
    pub authorized: bool,
    pub winner: Option<Pubkey>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Not a valid owner")]
    InvalidOwner,
    #[msg("Already Claimed")]
    AlreadyClaimed,
    #[msg("No winner")]
    NoWinner,
    #[msg("Non-authorized")]
    NonAuthorized,
}


