# 📊 StatX - AI-Powered Analytics Platform

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-blue?style=for-the-badge)

**StatX** is a modern, premium SaaS frontend application designed to transform raw Excel/CSV data into actionable, AI-driven business insights. Built with a strict focus on high-performance client-side processing, highly scalable feature-driven architecture, and pristine UX/UI.

🔗 **[Live Demo]([https://your-live-link.com](https://stat-x.vercel.app/))** | 📖 **[Read the Case Study](#)**

<img width="1551" height="786" alt="image" src="https://github.com/user-attachments/assets/118e1dec-0de6-46ad-b46a-e452d3cb746f" />



---

## ✨ Key Features

* **🧠 Client-Side AI & Forecasting:** Custom-built linear regression and anomaly detection algorithms (`aiHelpers.ts`) run directly in the browser. Predicts revenue trends and detects data spikes without relying on heavy backend machine learning libraries.
* **📈 Blazing Fast Data Processing:** Excel/CSV files are parsed entirely on the client-side using `xlsx`. This eliminates server processing bottlenecks and provides zero-latency feedback to the user.
* **🎨 Highly Customizable UI (Glassmorphism):** * Full Dark/Light/System theme support.
  * User-selectable **Accent Colors** and **Interface Density** (Comfortable vs Compact) managed globally via CSS Variables and Zustand.
* **🔒 Secure & Seamless Authentication:** Handled via Supabase with an interactive, animated UI. Includes a **"Guest Login"** feature for frictionless portfolio demonstration.
* **⚡ Modern Routing:** Utilizes `@tanstack/react-router` for type-safe routing and robust protected route logic (`beforeLoad` guards).
* **📱 Interactive Visualizations:** Dynamic radar, area, and bar charts built with `recharts`, heavily customized with gradients and backdrop-blur tooltips.

---

## 🛠️ Tech Stack

* **Core:** React 18, TypeScript, Vite
* **Routing:** TanStack Router (`@tanstack/react-router`)
* **State Management:** Zustand (Modular stores with `persist` middleware)
* **Styling:** Tailwind CSS + Custom CSS Variables
* **Data Visualization:** Recharts
* **Forms & Validation:** React Hook Form + Zod
* **Backend / Auth:** Supabase (PostgreSQL, Realtime Subscriptions)
* **File Parsing:** SheetJS (`xlsx`)

---

## 📂 Architecture & Folder Structure

This project follows a **Feature-Driven (Co-location)** architecture to ensure extreme scalability and maintainability. Components, hooks, and logic specific to a feature are grouped together.

```text
src/
├── components/          # Global Reusable UI (Navbar, Footer, Modals)
│   └── ui/              # Dumb components (Card, Badge, InputField, Select)
├── lib/                 # Third-party configurations
│   ├── supabase.ts      # Supabase client setup
│   └── validation.ts    # Zod schemas (Auth, Profile)
├── pages/               # Route components, separated by domains
│   ├── DashboardPage/   # Dashboard feature (Tabs, Charts, local hooks)
│   │   ├── components/  # Dashboard-specific UI (PerformanceChart, StatsGrid)
│   │   └── hooks/       # Localized state (useDashboardData)
│   ├── auth/            # Authentication flow (Login, Register, Guest mode)
│   ├── home/            # Landing page and marketing sections
│   └── setings/         # Profile, Security, and Appearance management
├── store/               # Global Zustand stores (Separation of Concerns)
│   ├── authStore.ts
│   ├── themeStore.ts
│   └── notificationStore.ts
├── utils/               # Pure functions & Business Logic
│   ├── aiHelpers.ts         # Math logic for regression & anomalies
│   ├── marketingHelpers.ts  # ROAS, ROI calculations
│   └── analyticsHelpers.ts  # Data aggregation & time-series formatting
├── router.tsx           # Centralized type-safe route tree & Auth Guards
└── main.tsx             # Application entry point
