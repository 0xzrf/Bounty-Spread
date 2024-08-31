use anchor_lang::prelude::*;

declare_id!("GSZSD689NKJHePHJx4F5B8VNCBk7B11EqquKt71KkSuw");

#[program]
pub mod dispense_program {
    use super::*;

    pub fn create_bounty(ctx:Context<CreateBounty>, amount: u64) -> Result<()> {
        let bounty = &mut ctx.accounts.bounty;
        bounty.creator = *ctx.accounts.creator.key;
        bounty.amount = amount;
        bounty.claimed = false;
        Ok(())
    }

    pub fn select_winner(ctx:Context<SelectWinner>, winner: Pubkey) -> Result<()>{
        let bounty = &mut ctx.accounts.bounty;
        require!(bounty.creator == *ctx.accounts.creator.key, ErrorCode::InvalidCreator);
        require!(!bounty.claimed , ErrorCode::AlreadyClaimed);

        bounty.winner = Some(winner);
        Ok(())
    }

    pub fn authorize_transfer(ctx:Context<AuthorizeTransfer>) -> Result<()>{
        let bounty = &mut ctx.accounts.bounty;
        require!(bounty.creator == *ctx.accounts.creator.key, ErrorCode::InvalidCreator);
        require!(!bounty.claimed, ErrorCode::AlreadyClaimed);
        require!(bounty.winner.is_some(), ErrorCode::NoWinnerSelected);

        bounty.transfer_authorize = true;
        Ok(())
    }

    pub fn claim_bounty(ctx:Context<ClaimBounty>) -> Result<()>{
        let bounty = &mut ctx.accounts.bounty;
        require!(bounty.winner == Some(*ctx.accounts.winner.key), ErrorCode::InvalidWinner);
        require!(!bounty.claimed, ErrorCode::AlreadyClaimed);
        require!(bounty.transfer_authorize, ErrorCode::TransferNotAuthorized);

        require!(
            ctx.accounts.creator.lamports() >= bounty.amount,
            ErrorCode::InsufficientCreatorBalance
        );

        let transfer_ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.creator.key(),
            &ctx.accounts.winner.key(),
            bounty.amount,
        );
        anchor_lang::solana_program::program::invoke(
            &transfer_ix,
            &[
                ctx.accounts.creator.to_account_info(),
                ctx.accounts.winner.to_account_info(),
            ] 
        )?;

        bounty.claimed = true;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateBounty<'info>{
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(init,
               payer = creator,
               space = 8 + 32 + 8 + 32 + 1 + 1,
               seeds = [b"bountyy",creator.key().as_ref()],
               bump)]
    pub bounty: Account<'info, Bounty>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct SelectWinner<'info> {
    #[account(mut)]
    pub bounty: Account<'info,Bounty>,
    pub creator: Signer<'info>, 
}

#[derive(Accounts)]
pub struct AuthorizeTransfer<'info>{ 
    // why would I need mutable reference here?
    #[account(mut)]
    pub creator: Signer<'info>,
    pub bounty: Account<'info, Bounty>
}

#[derive(Accounts)]
pub struct ClaimBounty<'info> {
    /// CHECK: This account is the creator of the bounty and its safety is verified by the program logic
    #[account(mut)]
    pub creator: AccountInfo<'info>,
    #[account(mut)]
    pub winner: Signer<'info>,
    #[account(mut)]
    pub bounty: Account<'info, Bounty>
}

#[account]
pub struct Bounty {
    pub creator: Pubkey,
    pub amount: u64,
    pub winner: Option<Pubkey>,
    pub claimed: bool,
    pub transfer_authorize: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid Creator")]
    InvalidCreator,
    #[msg("Already Claimed")]
    AlreadyClaimed,
    #[msg("No winner selected")]
    NoWinnerSelected,
    #[msg("Winner is Invalid")]
    InvalidWinner,
    #[msg("Transfer is not auhtorized")]
    TransferNotAuthorized,
    #[msg("Insufficient balance in Creator's account")]
    InsufficientCreatorBalance
}


