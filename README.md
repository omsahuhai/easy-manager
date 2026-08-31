# 🛢️ Easy Manager

A modern, mobile-first web application designed for Indian petrol pump owners to seamlessly manage daily meter readings, fuel rates, monthly expenses, and automated profit calculations across multiple business locations.

---

## 🏗️ Architecture & Multi-Tenancy

Easy Manager uses strict multi-tenant isolation powered by **Supabase Row Level Security (RLS)**:

```text
Owner (auth.users / profiles)
  └── Business Workspaces (petrol_pump, transport, etc.)
        ├── Daily Meter Readings (MS & HSD Opening/Closing)
        ├── Fuel Rates & Margins (Selling Rates & Dealer Margins)
        ├── Monthly Expenses (Salaries, Electricity, Generator, Maintenance)
        └── Automated Reports (Sales Volume, Revenue & Net RO Profit)
```

Every operational record is bound to a `business_id`. Owners can manage multiple stations independently without cross-contaminating sales, expenses, or profit analytics.

---

## ⛽ Business Logic & Calculation Engine

### Fuel Types Supported
- **MS** (Motor Spirit / Petrol)
- **HSD** (High-Speed Diesel)

### Calculation Rules
* **Net Volume (Litres):** $\text{Litres} = (\text{Closing Meter} - \text{Opening Meter}) - \text{Testing Litres}$
* **Sales Revenue (₹):** $\text{Sales} = \text{Net Litres} \times \text{Selling Rate}$
* **Total Fuel Revenue:** $\text{MS Revenue} + \text{HSD Revenue}$
* **RO Gross Margin (₹):** $\text{Gross Margin} = \text{Net Litres} \times \text{Dealer Margin per Litre}$
* **Net Profit (₹):** $\text{Net Profit} = \text{Total Gross Margin} - \text{Total Monthly Expenses}$

### Smart Features
1. **Dynamic Rate Continuation:** Fuel rates update daily at ~6:00 AM. If a rate remains unchanged on a given day, the calculation views automatically apply the most recent active rate.
2. **Sequential Meter Pre-fill:** Opening meter readings automatically populate from the previous day's closing reading.
3. **Database Views:** Calculations are computed in PostgreSQL views (`daily_sales_view`, `monthly_profit_summary_view`) with `security_invoker = true` to maintain a single source of truth while respecting RLS policies.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Icons & Theme:** [Lucide React](https://lucide.dev/) & [next-themes](https://github.com/pacocoursey/next-themes)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Supabase Auth, `@supabase/ssr`)
- **Validation:** [Zod](https://zod.dev/)

---

## 📁 Repository Structure

```text
easy-manager/
├── app/
│   ├── actions/          # Server actions for business, rates, readings, expenses
│   ├── auth/             # Supabase Auth routes (login, sign-up, password reset, callback)
│   ├── protected/        # Authenticated dashboard workspace
│   │   └── dashboard/
│   │       ├── create/   # New business creation wizard
│   │       └── [businessId]/
│   │           ├── readings/ # Daily meter readings management
│   │           ├── rates/    # Fuel rate history & margin settings
│   │           ├── expenses/ # Monthly expense tracking
│   │           └── reports/  # RO Profit & sales volume reports
│   ├── globals.css       # Global styles & CSS variables
│   ├── layout.tsx        # Root application layout
│   └── page.tsx          # Landing page & config onboarding
├── components/
│   ├── business/         # Business management components
│   ├── dashboard/        # Workspace navigation, business switcher, stat cards
│   ├── expenses/         # Expense forms, tables, & filter dialogs
│   ├── rates/            # Fuel rate forms & history tables
│   ├── readings/         # Meter reading forms & history tables
│   ├── reports/          # Monthly profit breakdown tables
│   └── ui/               # Reusable shadcn/ui primitives
├── lib/
│   ├── queries/          # RLS-safe database query functions
│   ├── supabase/         # SSR Supabase client & server instances
│   ├── date.ts           # Business calendar utilities
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # ClassName merger & environment checks
└── supabase/
    ├── config.toml       # Supabase CLI configuration
    └── migrations/       # Version-controlled SQL migration scripts
```

---

## 🚀 Getting Started

### 1. Environment Setup
Copy the example environment configuration file to `.env.local`:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```
*(Note: `NEXT_PUBLIC_SUPABASE_ANON_KEY` is also supported)*

### 2. Install Dependencies
```bash
npm install
```

### 3. Apply Database Migrations
Run the migration scripts located in `supabase/migrations/` in your Supabase SQL Editor, or apply them via the Supabase CLI:

```bash
npx supabase db push
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Compiles and builds the production application.
- `npm run start`: Starts the built production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

