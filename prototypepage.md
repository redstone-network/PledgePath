# PledgePath MVP Front-End Prototype Pages Requirements

This document outlines the front-end prototype page requirements for the PledgePath MVP, a Web3 product discovery platform built on Solana. Each page is designed to facilitate core user interactions, including wallet connection, project/demand discovery, staking, and user profile management. The design emphasizes Web3 principles such as transparency, user control, and community-driven validation through staking mechanisms 
.

## 1. Wallet Connection Page
​​Function:​​ Serves as the entry point for users to authenticate by connecting their Solana wallet (e.g., Phantom, Backpack). This page initializes the user's session and enables all subsequent interactions requiring blockchain transactions.
​​Necessary Fields/Elements:​​
- "Connect Wallet" button: Triggers wallet selection modal.
- Network status indicator: Displays current Solana network (e.g., Devnet, Mainnet).
- Brief onboarding text: Explains the platform's purpose and Web3 integration.
- Fallback options: Links to install a wallet if none is detected.

## 2. Home Page / Discovery Feed
​​Function:​​ Displays a dynamic feed of recently submitted projects and demands, allowing users to browse, filter, and discover opportunities. It acts as the central hub for community content 
.
​​Necessary Fields/Elements:​​
- ​​Project/Demand Cards:​​ Each card shows:
 - Title and short description (max 50 characters).
 - Category badge (e.g., DeFi, NFT).
 - Total pledge amount (in SOL) and backer count.
 - Submission timestamp.
- ​​Filtering Options:​​ Dropdowns to filter by category (e.g., Project/Demand, DeFi, GameFi) and sort by criteria (e.g., newest, most pledged).
- ​​Search Bar:​​ Allows real-time searching by keywords.
- ​​Navigation Tabs:​​ Quick switches between "Projects" and "Demands" feeds.
- ​​Staking CTA Buttons:​​ Quick "Pledge" buttons on cards for one-click staking.

## 3. Project Detail Page
​​Function:​​ Provides comprehensive details for a single project, enabling users to explore full descriptions, stake tokens, and participate in discussions. It validates project credibility through on-chain data 
.
​​Necessary Fields/Elements:​​
- ​​Project Header:​​
 - Project name and creator's wallet address (abbreviated).
 - Verification status badge (e.g., "Audited").
- ​​Core Information:​​
 - Full description (up to 500 characters).
 - Website/social links.
 - Project category and creation date.
- ​​Staking Metrics:​​
 - Live total pledge amount and backer count.
 - Progress bar showing funding goals (if applicable).
- ​​Interaction Section:​​
 - "Pledge" button with amount input slider.
 - Current user's stake status (e.g., "You pledged 5 SOL").
- ​​Discussion Area:​​
 - Comments list (visible only to users who staked).
 - Input field for adding comments.

## 4. Demand Detail Page
​​Function:​​ Showcases a user-submitted product demand, allowing others to support it with stakes and discuss potential solutions. It highlights community-driven needs 
.
​​Necessary Fields/Elements:​​
- ​​Demand Header:​​
 - Demand title and submitter's wallet address.
 - Urgency level indicator (e.g., 1-5 stars).
- ​​Problem Statement:​​
 - Detailed description of the need (up to 300 characters).
 - Desired outcomes or use cases.
- ​​Support Metrics:​​
 - Total support amount (in SOL) and supporter count.
 - Trend graph or indicator for demand popularity.
- ​​Action Section:​​
 - "Support This Demand" button with stake amount selector.
 - List of projects that claim to address this demand.
- ​​Community Discussion:​​
 - Thread for feedback and solution ideas.
 - Option for submitters to mark solutions as "accepted".

## 5. Submission Page (for Projects and Demands)
​​Function:​​ Allows authenticated users to submit new projects or demands through a structured form. It includes validation to ensure data quality 
.
​​Necessary Fields/Elements:​​
- ​​Type Selector:​​ Radio buttons or toggle to choose "Submit Project" or "Submit Demand".
- ​​Project Submission Form:​​
 - Title input (max 50 characters).
 - Description textarea (max 200 characters).
 - Website URL field.
 - Category dropdown (e.g., DeFi, Infrastructure).
 - Initial pledge amount (optional).
- ​​Demand Submission Form:​​
 - Title input (max 50 characters).
 - Detailed description textarea (max 300 characters).
 - Category dropdown (e.g., NeedProduct, NeedTool).
 - Urgency slider (1-5).
 - Initial support stake amount (required).
- ​​Validation and Buttons:​​
 - Real-time form validation messages.
 - "Submit" button that triggers wallet transaction signing.

## 6. User Dashboard Page
​​Function:​​ Provides a personal hub for users to track their activity, stakes, and reputation. It fosters engagement by displaying achievements and history 
.
​​Necessary Fields/Elements:​​
- ​​Profile Summary:​​
 - Connected wallet address and balance (in SOL).
 - PledgeScore (reputation metric) and join date.
- ​​Activity Feed:​​
 - Chronological list of user's actions (e.g., "You pledged 2 SOL to Project X").
 - Filters for "My Projects", "My Demands", and "My Pledges".
- ​​Portfolio Overview:​​
 - Total value of active pledges.
 - Performance indicators (e.g., ROI on successful projects).
- ​​Reputation Section:​​
 - Breakdown of metrics: successful pledges, created items, community rating.
 - Badges or rewards for milestones.

## 7. General UI/UX Considerations
- ​​Web3 Integration:​​ All pages must include wallet state indicators (e.g., connected address) and handle transaction states (pending, success, error) with clear feedback 
.
- ​​Responsive Design:​​ Pages should adapt to mobile and desktop screens, using a grid layout for cards and collapsible menus on smaller devices.
- ​​Accessibility:​​ High contrast ratios, scalable fonts, and ARIA labels for key actions to ensure inclusivity 
.
- ​​Consistent Styling:​​ Use a unified design system with Solana-themed colors (e.g., purples, greens) and reusable components like buttons and modals.

This prototype focuses on validating core features while maintaining a minimal scope. Iterations should incorporate user feedback to refine interfaces, following the MVP principle of iterative development 
.