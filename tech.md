# PledgePath MVP - Solana Smart Contract Documentation

## 1. Overview
This document outlines the smart contract specifications for the PledgePath MVP, a community-driven Web3 product discovery platform built on Solana. The contract manages the core logic for submitting projects, creating product demands, and handling pledge interactions. The program is implemented in Rust using the Anchor framework 
.

## 2. Core Data Structures

### 2.1 Project Account
Stores project information and statistics on-chain.
```
#[account]
pub struct Project {
 pub authority: Pubkey, // Project creator's wallet address
 pub title: String, // Project name (max 50 chars)
 pub description: String, // Project description (max 200 chars)
 pub website: String, // Project website/link
 pub category: ProjectCategory, // Project classification
 pub created_at: i64, // Creation timestamp
 pub updated_at: i64, // Last update timestamp
 pub total_pledge_amount: u64, // Total pledged amount (lamports)
 pub pledge_count: u32, // Number of unique pledgers
 pub is_verified: bool, // Admin verification status
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
```

### 2.2 Demand Account
Stores user-submitted product demands 
.
```
#[account]
pub struct Demand {
 pub authority: Pubkey, // Demand creator's wallet address
 pub title: String, // Demand title (max 50 chars)
 pub description: String, // Detailed description (max 300 chars)
 pub category: DemandCategory, // Demand classification
 pub urgency: u8, // Urgency level (1-5)
 pub created_at: i64, // Creation timestamp
 pub total_support_amount: u64, // Total support pledged (lamports)
 pub supporter_count: u32, // Number of supporters
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum DemandCategory {
 NeedProduct, // Need a specific product
 NeedFeature, // Need a specific feature
 NeedTool, // Need a specific tool
}
```

### 2.3 Pledge Account
Records user pledges to projects or demands.
```
#[account]
pub struct Pledge {
 pub authority: Pubkey, // Pledger's wallet address
 pub target: Pubkey, // Target account (Project/Demand pubkey)
 pub target_type: TargetType, // Type of target
 pub amount: u64, // Pledged amount (lamports)
 pub created_at: i64, // Pledge timestamp
 pub is_active: bool, // Active status
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum TargetType {
 Project, // Pledge to project
 Demand, // Support for demand
}
```

### 2.4 UserReputation Account
Tracks user reputation and contribution metrics 
.
```
#[account]
pub struct UserReputation {
 pub authority: Pubkey, // User's wallet address
 pub pledge_score: u64, // Total pledge contribution score
 pub successful_pledges: u32, // Number of successful pledges
 pub created_demands: u32, // Number of demands created
 pub created_projects: u32, // Number of projects created
 pub updated_at: i64, // Last update timestamp
}
```

## 3. Program Instructions (Interface)

### 3.1 Project Management Instructions

#### initialize_project- Create New Project
Creates a new project account with initial data 
.
​​Accounts Context:​​
- project(mutable): New project PDA account
- authority(mutable, signer): Project creator
- system_program: Solana System Program

​​Parameters:​​
- title: String
- description: String
- website: String
- category: ProjectCategory

#### pledge_to_project- Pledge to Project
Allows users to pledge funds to support a project.
​​Accounts Context:​​
- project(mutable): Target project account
- pledge(mutable): Pledge record account
- authority(mutable, signer): Pledger's wallet
- user_reputation(mutable): User's reputation account
- system_program: Solana System Program

​​Parameters:​​
- amount: u64 (lamports)

### 3.2 Demand Management Instructions

#### create_demand- Submit New Demand
Creates a new product demand with initial support pledge 
.
​​Accounts Context:​​
- demand(mutable): New demand PDA account
- authority(mutable, signer): Demand creator
- system_program: Solana System Program

​​Parameters:​​
- title: String
- description: String
- category: DemandCategory
- urgency: u8
- initial_support: u64 (lamports)

#### support_demand- Support Existing Demand
Allows users to add support to existing demands.
​​Accounts Context:​​
- demand(mutable): Target demand account
- support(mutable): Support record account
- authority(mutable, signer): Supporter's wallet
- system_program: Solana System Program

​​Parameters:​​
- amount: u64 (lamports)

### 3.3 Reputation System Instructions

#### update_reputation- Update User Reputation
Updates user reputation based on recent activities 
.
​​Accounts Context:​​
- user_reputation(mutable): User's reputation account
- authority(signer): User's wallet

## 4. Account Constraints and PDA Seeds

| Account Type | PDA Seeds | Description |
|--------------|-----------|-------------|
| Project | [b"project", authority.key().as_ref(), title.as_bytes()]| Unique project identifier |
| Demand | [b"demand", authority.key().as_ref(), title.as_bytes()]| Unique demand identifier |
| Pledge | [b"pledge", authority.key().as_ref(), target.key().as_ref()]| Unique pledge record |
| UserReputation | [b"reputation", authority.key().as_ref()]| User reputation account |

## 5. Error Handling

```rust
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
```

## 6. Deployment Specifications

​​Target Network​​: Solana Devnet (Initial MVP) 
​​Framework​​: Anchor v0.30.1+
​​Rust Version​​: 1.75.0+
​​Program ID​​: To be generated upon deployment
​​Expected Gas Costs​​: ~0.005 SOL average per transaction 

This documentation provides the technical foundation for implementing PledgePath's core smart contract functionality on the Solana blockchain, emphasizing security, performance, and user experience while maintaining the decentralized nature of the platform 
.