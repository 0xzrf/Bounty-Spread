use anchor_lang::prelude::*;

declare_id!("6Z4fE5PwpWZx82jx69L3Efutimsa4FnwcC4wwGD9y7N5");

#[program]
pub mod dispensor_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
