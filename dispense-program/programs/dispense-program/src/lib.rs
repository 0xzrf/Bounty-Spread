use anchor_lang::prelude::*;

declare_id!("CTiZ5kBwGde4oABggEebJvNzDm6XktQ5E4hqfiiuyGvK");

#[program]
pub mod dispense_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
