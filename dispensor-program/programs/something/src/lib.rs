use anchor_lang::prelude::*;

declare_id!("4E3bVhwz7E1oyNN1VRh8pwczxxSerZYfxDJzeALYm2ND");

#[program]
pub mod something {
    use super::*;

    
}

#[derive(Accounts)]
pub struct Initialize {}


#[accounts]
pub struct EscrowStates {
    pub maker: PubKey,
    pub seed: u8,
    pub escrow_bump: u8,
    pub escrow_vault_bump: u8,
    pub hash: [u8; 32]
}