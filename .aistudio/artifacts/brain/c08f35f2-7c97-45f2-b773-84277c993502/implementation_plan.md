# Multi-User Authentication & Account Isolation Plan

Support multi-user authentication (sign-up, sign-in, and pre-configured quick demo accounts) where every user inherits the canonical base catalog of ingredients and recipes, while maintaining private per-user edits and a pristine empty weekly meal planner with starter week onboarding.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed via clarifying questions:

- **Private Per-User Catalog & Pantry**: Every account receives a personal fork of the base recipe and ingredient catalog upon creation. Any additions, adjustments, or pantry availability toggles remain isolated to that user account.
- **Authentication Method**: Email and password authentication with instant 1-click pre-configured demo accounts ("Maya Patel — Nutritionist" and "Alex Rivera — Home Chef") for friction-free testing.
- **Empty Weekly Planner Onboarding**: All new user accounts initialize with a 100% empty weekly plan. The planner displays an inviting zero-state banner with an optional "Populate Starter Week" one-click action and a "Browse Recipes" button.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms Kitchen Table from a single-session in-memory planner into an authenticated multi-user application. Users can register with email and password or instantly switch between demo profiles. Each user profile owns their private weekly plan, customized recipes, and pantry ingredient availability.
- **Target Audience / Persona**: Individuals and households organizing weekly meals, nutritionists planning specialized menus, and home cooks curating personal variations of base recipes.
- **Key Value**: Preserves personal meal schedules and dietary preferences per user account without data collisions, while guaranteeing instant access to rich curated recipes and ingredients from the start.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Authentication & Onboarding**:
   - Top bar displays the active user profile (avatar, name, email) or a "Sign In" button.
   - Clicking opens the Auth Modal offering tabs for **Sign In**, **Create Account**, and **Demo Accounts**.
   - Demo accounts allow single-click login with pre-populated credentials.
   - Upon sign-up, the user profile is created, base data is cloned, and the user is signed in seamlessly.

2. **Empty Planner Zero-State & Starter Week**:
   - When a newly registered user visits the **Planner** tab, every meal slot across Monday–Sunday is empty.
   - A welcoming onboarding card highlights: *"Your week is ready to plan. Add meals to any slot or populate a balanced starter week."*
   - Clicking **"Populate Starter Week"** intelligently fills the week with curated meals, which can be modified or cleared anytime with a **"Clear Week"** action.

3. **Isolated Recipes & Pantry Management**:
   - Users can toggle pantry availability on ingredients or create custom recipes.
   - Changes are saved directly to that user's private account partition and persist across page refreshes.
   - Logging into another account immediately displays that account's distinct plan and pantry status.

4. **Account Management & Sign Out**:
   - Clicking the user profile avatar in the top bar reveals a menu with user details, account switch options, and a **Sign Out** button.
   - Signing out safely returns to a guest state or prompts login without wiping stored user accounts.

### Visual Identity & Theme

- **Palette**: Warm slate canvas (`#F8FAFC` light / `#0F172A` dark) paired with Kitchen Table's signature emerald accent (`#059669` emerald-600) and amber culinary highlights.
- **Top Bar Contract**: Adheres strictly to the 3-zone contract:
  - **Zone 1 (Brand)**: Kitchen Table logo and wordmark (`shrink-0`).
  - **Zone 2 (Nav Links)**: `Planner`, `Recipes`, `Ingredients` single-line tabs.
  - **Zone 3 (Actions & Account)**: Primary context action (e.g. `+ Add Meal` or `+ Recipe`) alongside the user account pill/avatar dropdown.
- **Zero-Pill Metadata**: Recipe calories, prep times, and macro breakdowns continue to use clean text with subtle typographic separators (`·`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side Multi-Account Storage Engine with LocalStorage**
  - *Chosen Approach*: Implement a structured multi-user storage engine (`userStore`) that persists accounts, sessions, and per-user data partitions in browser `localStorage`.
  - *Why*: Eliminates dependencies on external server provisioning while ensuring zero-latency transitions, 100% offline reliability in AI Studio, and permanent persistence across refreshes and dev server restarts.
  - *Alternatives Considered*: Server-side SQLite/Postgres backend. Avoided because dev server runs Vite directly in the container without active Postgres/Python backend daemons.

- **Decision 2: Base Seed Inheritance via Copy-on-Write / Forking**
  - *Chosen Approach*: New accounts copy the canonical `INITIAL_RECIPES` and `INITIAL_INGREDIENTS` into their private user partition.
  - *Why*: Guarantees that every user immediately has the full 20+ recipes and 100+ ingredients ready to use, while allowing them to edit quantities or delete items without breaking other users' libraries.

- **Decision 3: Quick Demo Accounts & Seamless Switching**
  - *Chosen Approach*: Provide 2 pre-seeded demo personas with distinct meal planner preferences and one-click quick switch buttons.
  - *Why*: Allows instant verification of account isolation and multi-user switching without forcing repetitive form filling.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Bar & Navigation                            │
│   [Kitchen Table] ── [Planner | Recipes | Ingredients] ── [User Avatar] │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         Auth & Session Context                         │
│   • currentUser: UserProfile | null                                    │
│   • signIn(email, password), signUp(name, email, password), signOut()   │
│   • switchDemoAccount(demoId)                                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  ▼                                   ▼
┌───────────────────────────────────┐   ┌────────────────────────────────┐
│        User Account Store         │   │      Active User Data Store    │
│  • accounts: Record<string, User> │   │  • recipes: Recipe[]           │
│  • activeSession: string (userId) │   │  • ingredients: Ingredient[]   │
│  • demoAccounts: DemoUser[]       │   │  • weeklyPlan: DayPlans        │
└───────────────────────────────────┘   └────────────────────────────────┘
                  │                                   │
                  ▼                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Browser LocalStorage Engine                       │
│   • "kt_accounts"          → User directory & credentials               │
│   • "kt_session"           → Currently active user ID                  │
│   • "kt_user_data_{id}"    → Isolated recipes, ingredients & plan      │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Entities & Schema

```typescript
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'chef' | 'nutritionist' | 'home_cook';
  createdAt: string;
}

export interface UserAccountData {
  userId: string;
  recipes: Recipe[];
  ingredients: Ingredient[];
  weeklyPlan: Record<string, Record<MealSlot, string[]>>; // completely empty for new users
  hasPopulatedStarterWeek?: boolean;
}
```

### Component & State Mapping

1. **`src/services/authStore.ts`**:
   - Manages user creation, password verification, demo account bootstrapping, session cookies/keys, and per-user data loading/saving.
   - Seeds default accounts if none exist:
     - `Maya Patel` (`maya@kitchentable.app`): Nutritionist profile with plant-forward preferences.
     - `Alex Rivera` (`alex@kitchentable.app`): Home Chef profile with family meal preferences.
2. **`src/components/AuthModal.tsx`**:
   - Polished modal dialog with 3 accessible tabs: **Sign In**, **Sign Up**, and **Demo Profiles**.
   - Input validation, friendly error messaging, and password show/hide toggles.
3. **`src/components/UserMenu.tsx`**:
   - Top-right avatar trigger displaying the user's initial or photo.
   - Dropdown showing active user email, quick profile switch, and sign out button.
4. **`src/screens/MainScreens.tsx` (`PlannerScreen`)**:
   - Listens to active user's `weeklyPlan`.
   - Renders empty planner state when all days are empty, featuring:
     - `"Populate Starter Week"` one-click generator button.
     - `"Browse Recipes"` link.
     - Clear week option when populated.
5. **`src/App.tsx`**:
   - Wraps the application in active user state.
   - Synchronizes recipe edits, ingredient changes, and meal plan slots to `authStore.saveUserData()`.
