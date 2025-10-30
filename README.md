# PledgePath MVP Product Requirements Document

## 1. Document Overview

| **Attribute** | **Detail** |
| :--- | :--- |
| **Product Name** | PledgePath |
| **Document Version** | 1.0 |
| **Author** | [Your Name] |
| **Last Updated** | 2025-10-30 |
| **Target Release** | MVP (Minimum Viable Product) |

## 2. Version History

| Version | Date | Author | Changes |
| :--- | :--- | :--- | :--- |
| 1.0 | 2025-10-1 | [Your Name] | Initial version created for MVP scope |

## 3. Product Overview

### 3.1. Vision & Mission
**Vision:** To create a community-driven, stake-verified discovery platform for Web3 needs and projects, establishing a trusted market where user demand is quantified and project value is validated.
**Mission for MVP:** To validate the core "Pledge-to-Discover" mechanism by enabling builders to submit projects and users to submit and pledge support to product demands, creating a foundational loop of validated discovery[1](@ref).

### 3.2. Problem Statement
The Web3 ecosystem is fragmented and noisy. High-potential early-stage projects struggle to gain visibility and meaningful validation, while genuine user demand for specific products or features lacks a structured channel to be expressed and quantified, leading to a significant resource mismatch and slowed innovation[1,3](@ref).

### 3.3. Goals & Objectives
The primary goal of this MVP is to validate the core business hypothesis that a staking mechanism can effectively signal genuine demand and project quality[4](@ref).
*   **Primary Goal:** Validate the "Pledge-to-Discover" mechanism.
*   **Success Metric:** Attract at least 100 unique wallet addresses to perform a pledge action on the platform.
*   **Secondary Goal:** Activate community participation.
*   **Success Metric:** Achieve a 1:1 ratio of user-submitted demands to builder-submitted projects.
*   **Technical Goal:** Ensure core on-chain interactions (staking, submitting) are stable on Solana Devnet.

## 4. User Stories & Scenarios

| ID | User Role | Story | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| US-001 | Product Hunter | As a user, I want to browse a feed of the latest and hottest Web3 projects and demands so I can quickly discover opportunities. | The home page displays a chronological feed of project and demand cards. |
| US-002 | Product Hunter | As a user, when I find a project I believe in, I want to pledge a token amount to support it so that my support is recorded and boosts its visibility[1](@ref). | The project detail page has a functional "Pledge" button that triggers a wallet transaction. |
| US-003 | Seasoned User | As a user, when I identify a missing tool in the market, I want to submit a detailed product demand and pledge tokens to signal its urgency, so I can attract builders to create it. | A "Submit Demand" form is available, requiring a staked amount to post. |
| US-004 | Builder | As a builder, I want to submit my project with a description and links so I can get early community feedback and support. | A "Submit Project" form is available and accessible after wallet connection. |
| US-005 | Builder | As a builder, I want to sort the list of demands by the total amount pledged so I can identify the most urgent and valuable problems to solve. | The demands list page has a sorting filter for "Most Funded". |

## 5. Features & Functional Requirements

### 5.1. Wallet Connection & Authentication
- **Description:** Users must connect a Solana wallet (e.g., Phantom) to interact with core features. The wallet address serves as the primary user identity.
- **Requirements:**
    - Integrate a standard Solana wallet adapter.
    - Display a truncated wallet address (e.g., `5HsQ...1abc`) upon connection.
    - "Pledge," "Submit Project," and "Submit Demand" buttons are only enabled post-connection.

### 5.2. Project Submission & Display
- **Description:** Allows authenticated users (Builders) to submit new projects to be displayed in the main feed.
- **Requirements:**
    - Submission form with fields: Project Name, Description (200 char max), Website/Link, Category (DeFi, GameFi, NFT, etc.).
    - Submitted projects appear in the home page feed, sorted by submission time (newest first).
    - Project card displays: Name, short description, category, submission time, total pledge amount, backer count.
    - Clicking a card leads to a detail page with all info and a "Pledge" button.

### 5.3. Demand Submission & Display
- **Description:** Allows authenticated users (Product Hunters) to submit new product demands, showcased on a dedicated page.
- **Requirements:**
    - Submission form with fields: Demand Title, Detailed Description, Category, Urgency Level (1-5 slider).
    - Submitting a demand requires staking a token amount (e.g., SOL) as a "support bond."
    - Demands list page can be sorted by "Latest" and "Most Funded" (total pledge amount).
    - Demand card displays: Title, short description, total support amount, supporter count, urgency icon.

### 5.4. Core Pledge Mechanism
- **Description:** The core interaction. Users can pledge tokens to projects or demands, boosting their ranking.
- **Requirements:**
    - "Pledge" button on project/demand detail pages opens a modal for amount input.
    - Pledge action requires signing a transaction and paying gas fees.
    - Total pledge amount and backer count update in real-time upon successful transaction.
    - User's pledge status is visually indicated (e.g., "Pledged" badge).

### 5.5. Content Feed & Navigation
- **Description:** Clear navigation and content presentation for easy browsing.
- **Requirements:**
    - Home page defaults to a "Projects" feed.
    - Top navigation provides clear tabs/links to switch between "Projects" and "Demands" lists.
    - Basic filter (e.g., by Category) for content.
    - A prominent "Submit" button (floating or fixed) for submitting new projects/demands.

## 6. Non-Functional Requirements

-   **Performance:** Page load times under 3 seconds. Clear user feedback (e.g., loading spinners) for on-chain transactions, which are subject to Solana network confirmation times (seconds)[9](@ref).
-   **Compatibility:** Must support the latest two stable versions of Chrome, Firefox, and Edge. Frontend must be compatible with major Solana wallet extensions.
-   **Security:** Smart contracts must be audited (MVP can be on Testnet). All wallet interactions must clearly display transaction details. A confirmation prompt is required for all pledge actions[1](@ref).
-   **Usability:** The UI must be intuitive and adhere to Web3 user conventions. Clear, immediate feedback must be provided for all key actions (success, failure).

## 7. Out-of-Scope (MVP)

The following items are **explicitly out of scope** for the MVP to maintain focus and speed[4,5](@ref):
-   Multi-chain support (Focus on Solana).
-   Complex reputation algorithm (PledgeScore V2).
-   Mobile application (Responsive web app only).
-   Token economy/govemance (Phase 2).
-   Advanced notifications system.

## 8. Technical Specifications (Summary)

The MVP's core logic will be powered by programs (smart contracts) deployed on **Solana Devnet**.
-   **Project Registry Program:** Creates and manages Project accounts (PDAs), storing core metadata and pledge statistics.
-   **Demand Registry Program:** Creates and manages Demand accounts (PDAs), storing core metadata and support statistics.
-   **Pledge Management Program:** Handles user pledges to any target (project/demand), records each pledge, and updates the target's total stake.

## 9. Key Metrics & Success Criteria (KPIs)

-   **Primary KPI:** Number of unique wallet addresses that perform a pledge action (> 100).
-   **Engagement Health:** Average number of pledgers per project/demand (> 5).
-   **Content Creation Ratio:** Ratio of user-submitted