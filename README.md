# Easy Manager

A mobile-first web application designed for Indian petrol pump owners to seamlessly manage daily meter readings, fuel rates, expenses, and automated profit calculations across multiple businesses.

---

## 🏗 Architecture & Hierarchy

Easy Manager is structured with strict multi-tenant isolation via **Supabase Row Level Security (RLS)**:

```text
Owner (auth.users / profiles)
  └── Businesses (petrol_pump, transport, etc.)
        ├── Daily Meter Readings (Opening/Closing MS & HSD)
        ├── Fuel Rates & Margins
        └── Monthly Expenses
```

Every business's operational data is strictly isolated using `business_id` so that an owner can independently manage multiple operations (e.g., *Shree Gopal Fuels* vs *Shree Gopal Transport*) without mixing expenses, sales, or profits.

---

## 🛢 Core Business Logic (Petrol Pump MVP)

### Fuel Types Supported
- **MS** (Motor Spirit / Petrol)
- **HSD** (High-Speed Diesel)

### Calculation Rules
* **Volume (Litres):** $\text{Litres} = \text{Closing Meter} - \text{Opening Meter}$
* **Sales (₹):** $\text{Sales} = \text{Litres} \times \text{Selling Rate}$
* **Total Fuel Sales:** $\text{MS Sales} + \text{HSD Sales}$
* **RO Profit (₹):** $\text{Litres} \times \text{Margin per Litre}$
* **Net Profit (₹):** $\text{Total RO Profit} - \text{Total Monthly Pump Expenses}$

### Smart Business Rules
1. **Dynamic Rate Continuation:** Rates change daily at ~6:13 AM. If a rate does not change on a given day, the system automatically uses the most recent active rate.
2. **Sequential Meter Readings:** Today's opening reading pre-fills from the previous valid day's closing reading.
3. **Database Views:** Calculations are performed directly in PostgreSQL views (`daily_sales_view`, `monthly_profit_summary_view`) with `security_invoker = true` to maintain a single source of truth while respecting RLS.

---

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Supabase Auth)

---

## 📁 Repository Structure

```text
my-supabase-app/
├── app/                  # Next.js App Router pages and layouts
│   ├── auth/             # Authentication callbacks & flows
│   └── protected/        # Authenticated routes
├── components/           # UI components & form widgets
├── lib/
│   └── supabase/         # Supabase client helpers (client, server, middleware)
└── supabase/
    ├── config.toml       # Local Supabase CLI configuration
    └── migrations/       # Version-controlled SQL migrations
        ├── 20260822073045_init_schema.sql
        ├── 20260822080004_fix_security_definer_views.sql
        └── 20260822080650_revoke_rls_auto_enable_execute.sql
```

---

## 🚀 Getting Started

### 1. Environment Setup
Ensure `.env.local` is present with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Database Migrations
To push any new migrations to your linked Supabase project:
```bash
npx supabase db push
```

---

## 🗺 Project Phases

- [x] **Phase 1: Database Architecture & Core Models**
  - Designed isolated multi-business schema.
  - Implemented `profiles`, `businesses`, `fuel_rates`, `daily_meter_readings`, `expenses`.
  - Configured RLS policies, indexing, and calculation views with `security_invoker`.
  - Audited database security with Supabase DB advisors.
- [x] **Phase 2: Owner Dashboard & Business Selection**
- [x] **Phase 3: Project Branding & UI/UX Polish**
- [ ] **Phase 4: Daily Reading & Fuel Rate Management UI**
- [ ] **Phase 5: Monthly Expense Tracking & RO Profit Reports**

