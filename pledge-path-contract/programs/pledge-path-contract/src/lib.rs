use anchor_lang::prelude::*;
use anchor_lang::system_program::{self, Transfer};

declare_id!("28cs6xPpRV4aUNZZGEU2PEwKhi7FTCrgSuAzLLSKLowx");

#[program]
pub mod pledge_path_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn initialize_project(
        ctx: Context<InitializeProject>,
        title: String,
        description: String,
        website: String,
        category: ProjectCategory,
    ) -> Result<()> {
        require!(title.len() <= MAX_TITLE_LEN, PledgePathError::TextTooLong);
        require!(description.len() <= MAX_PROJECT_DESC_LEN, PledgePathError::TextTooLong);
        require!(website.len() <= MAX_WEBSITE_LEN, PledgePathError::TextTooLong);

        let project = &mut ctx.accounts.project;
        let clock = Clock::get()?;
        project.authority = ctx.accounts.authority.key();
        project.title = title;
        project.description = description;
        project.website = website;
        project.category = category;
        project.created_at = clock.unix_timestamp;
        project.updated_at = clock.unix_timestamp;
        project.total_pledge_amount = 0;
        project.pledge_count = 0;
        project.is_verified = false;
        Ok(())
    }

    pub fn pledge_to_project(
        ctx: Context<PledgeToProject>,
        amount: u64,
        target_type: TargetType,
    ) -> Result<()> {
        require!(amount > 0, PledgePathError::InvalidAmount);
        require!(target_type == TargetType::Project, PledgePathError::Unauthorized);

        let project = &mut ctx.accounts.project;
        let pledge = &mut ctx.accounts.pledge;

        let transfer_ctx = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.authority.to_account_info(),
                to: project.to_account_info(),
            },
        );
        system_program::transfer(transfer_ctx, amount)?;

        let clock = Clock::get()?;
        project.total_pledge_amount = project
            .total_pledge_amount
            .checked_add(amount)
            .ok_or(PledgePathError::ArithmeticOverflow)?;
        project.pledge_count = project
            .pledge_count
            .checked_add(1)
            .ok_or(PledgePathError::ArithmeticOverflow)?;
        project.updated_at = clock.unix_timestamp;

        pledge.authority = ctx.accounts.authority.key();
        pledge.target = project.key();
        pledge.target_type = target_type;
        pledge.amount = amount;
        pledge.created_at = clock.unix_timestamp;
        pledge.is_active = true;

        let user_rep = &mut ctx.accounts.user_reputation;
        user_rep.authority = ctx.accounts.authority.key();
        user_rep.pledge_score = user_rep
            .pledge_score
            .checked_add(amount)
            .ok_or(PledgePathError::ArithmeticOverflow)?;
        user_rep.successful_pledges = user_rep
            .successful_pledges
            .checked_add(1)
            .ok_or(PledgePathError::ArithmeticOverflow)?;
        user_rep.updated_at = clock.unix_timestamp;

        Ok(())
    }

    pub fn create_demand(
        ctx: Context<CreateDemand>,
        title: String,
        description: String,
        category: DemandCategory,
        urgency: u8,
        initial_support: u64,
    ) -> Result<()> {
        require!(title.len() <= MAX_TITLE_LEN, PledgePathError::TextTooLong);
        require!(description.len() <= MAX_DEMAND_DESC_LEN, PledgePathError::TextTooLong);
        require!(urgency >= 1 && urgency <= 5, PledgePathError::InvalidRating);

        let demand = &mut ctx.accounts.demand;
        let clock = Clock::get()?;
        demand.authority = ctx.accounts.authority.key();
        demand.title = title;
        demand.description = description;
        demand.category = category;
        demand.urgency = urgency;
        demand.created_at = clock.unix_timestamp;
        demand.total_support_amount = 0;
        demand.supporter_count = 0;

        if initial_support > 0 {
            let transfer_ctx = CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.authority.to_account_info(),
                    to: demand.to_account_info(),
                },
            );
            system_program::transfer(transfer_ctx, initial_support)?;

            demand.total_support_amount = demand
                .total_support_amount
                .checked_add(initial_support)
                .ok_or(PledgePathError::ArithmeticOverflow)?;
            demand.supporter_count = demand
                .supporter_count
                .checked_add(1)
                .ok_or(PledgePathError::ArithmeticOverflow)?;
        }

        Ok(())
    }

    pub fn support_demand(
        ctx: Context<SupportDemand>,
        amount: u64,
        target_type: TargetType,
    ) -> Result<()> {
        require!(amount > 0, PledgePathError::InvalidAmount);
        require!(target_type == TargetType::Demand, PledgePathError::Unauthorized);

        let demand = &mut ctx.accounts.demand;
        let support = &mut ctx.accounts.support;

        let transfer_ctx = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.authority.to_account_info(),
                to: demand.to_account_info(),
            },
        );
        system_program::transfer(transfer_ctx, amount)?;

        let clock = Clock::get()?;
        demand.total_support_amount = demand
            .total_support_amount
            .checked_add(amount)
            .ok_or(PledgePathError::ArithmeticOverflow)?;
        demand.supporter_count = demand
            .supporter_count
            .checked_add(1)
            .ok_or(PledgePathError::ArithmeticOverflow)?;

        support.authority = ctx.accounts.authority.key();
        support.target = demand.key();
        support.target_type = target_type;
        support.amount = amount;
        support.created_at = clock.unix_timestamp;
        support.is_active = true;

        Ok(())
    }

    pub fn update_reputation(ctx: Context<UpdateReputation>) -> Result<()> {
        let clock = Clock::get()?;
        let user_rep = &mut ctx.accounts.user_reputation;
        require_keys_eq!(user_rep.authority, ctx.accounts.authority.key(), PledgePathError::Unauthorized);
        user_rep.updated_at = clock.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct InitializeProject<'info> {
    #[account(
        init,
        payer = authority,
        space = Project::SPACE,
        seeds = [b"project", authority.key().as_ref(), title.as_bytes()],
        bump
    )]
    pub project: Account<'info, Project>;
    #[account(mut)]
    pub authority: Signer<'info>;
    pub system_program: Program<'info, System>;
}

#[derive(Accounts)]
pub struct PledgeToProject<'info> {
    #[account(mut)]
    pub project: Account<'info, Project>;
    #[account(
        init,
        payer = authority,
        space = Pledge::SPACE,
        seeds = [b"pledge", authority.key().as_ref(), project.key().as_ref()],
        bump
    )]
    pub pledge: Account<'info, Pledge>;
    #[account(
        init_if_needed,
        payer = authority,
        space = UserReputation::SPACE,
        seeds = [b"reputation", authority.key().as_ref()],
        bump
    )]
    pub user_reputation: Account<'info, UserReputation>;
    #[account(mut)]
    pub authority: Signer<'info>;
    pub system_program: Program<'info, System>;
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct CreateDemand<'info> {
    #[account(
        init,
        payer = authority,
        space = Demand::SPACE,
        seeds = [b"demand", authority.key().as_ref(), title.as_bytes()],
        bump
    )]
    pub demand: Account<'info, Demand>;
    #[account(mut)]
    pub authority: Signer<'info>;
    pub system_program: Program<'info, System>;
}

#[derive(Accounts)]
pub struct SupportDemand<'info> {
    #[account(mut)]
    pub demand: Account<'info, Demand>;
    #[account(
        init,
        payer = authority,
        space = Pledge::SPACE,
        seeds = [b"pledge", authority.key().as_ref(), demand.key().as_ref()],
        bump
    )]
    pub support: Account<'info, Pledge>;
    #[account(mut)]
    pub authority: Signer<'info>;
    pub system_program: Program<'info, System>;
}

#[derive(Accounts)]
pub struct UpdateReputation<'info> {
    #[account(mut)]
    pub user_reputation: Account<'info, UserReputation>;
    pub authority: Signer<'info>;
}

#[account]
pub struct Project {
    pub authority: Pubkey,
    pub title: String,
    pub description: String,
    pub website: String,
    pub category: ProjectCategory,
    pub created_at: i64,
    pub updated_at: i64,
    pub total_pledge_amount: u64,
    pub pledge_count: u32,
    pub is_verified: bool,
}

impl Project {
    pub const SPACE: usize = 8
        + 32
        + (4 + MAX_TITLE_LEN)
        + (4 + MAX_PROJECT_DESC_LEN)
        + (4 + MAX_WEBSITE_LEN)
        + 1
        + 8
        + 8
        + 8
        + 4
        + 1;
}

#[account]
pub struct Demand {
    pub authority: Pubkey,
    pub title: String,
    pub description: String,
    pub category: DemandCategory,
    pub urgency: u8,
    pub created_at: i64,
    pub total_support_amount: u64,
    pub supporter_count: u32,
}

impl Demand {
    pub const SPACE: usize = 8
        + 32
        + (4 + MAX_TITLE_LEN)
        + (4 + MAX_DEMAND_DESC_LEN)
        + 1
        + 1
        + 8
        + 8
        + 4;
}

#[account]
pub struct Pledge {
    pub authority: Pubkey,
    pub target: Pubkey,
    pub target_type: TargetType,
    pub amount: u64,
    pub created_at: i64,
    pub is_active: bool,
}

impl Pledge {
    pub const SPACE: usize = 8 + 32 + 32 + 1 + 8 + 8 + 1;
}

#[account]
pub struct UserReputation {
    pub authority: Pubkey,
    pub pledge_score: u64,
    pub successful_pledges: u32,
    pub created_demands: u32,
    pub created_projects: u32,
    pub updated_at: i64,
}

impl UserReputation {
    pub const SPACE: usize = 8 + 32 + 8 + 4 + 4 + 4 + 8;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum ProjectCategory {
    DeFi,
    GameFi,
    NFT,
    Infrastructure,
    SocialFi,
    AI,
    Other,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum DemandCategory {
    NeedProduct,
    NeedFeature,
    NeedTool,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum TargetType {
    Project,
    Demand,
}

#[error_code]
pub enum PledgePathError {
    #[msg("Invalid amount specified")]
    InvalidAmount,
    #[msg("Arithmetic operation overflow")]
    ArithmeticOverflow,
    #[msg("Unauthorized access attempt")]
    Unauthorized,
    #[msg("Account not found")]
    AccountNotFound,
    #[msg("Text length exceeds maximum allowed")]
    TextTooLong,
    #[msg("Invalid rating value")]
    InvalidRating,
    #[msg("Pledge record not found")]
    PledgeNotFound,
}

const MAX_TITLE_LEN: usize = 50;
const MAX_PROJECT_DESC_LEN: usize = 200;
const MAX_WEBSITE_LEN: usize = 100;
const MAX_DEMAND_DESC_LEN: usize = 300;
