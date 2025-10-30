use anchor_lang::prelude::*;

declare_id!("28cs6xPpRV4aUNZZGEU2PEwKhi7FTCrgSuAzLLSKLowx");

#[program]
pub mod pledge_path_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
