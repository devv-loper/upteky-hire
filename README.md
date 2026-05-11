# 🚀 Upteky Hire — Candidate Management Dashboard

A modern, full-featured **Candidate Management Dashboard** built for Upteky's Developer Internship task. Designed with a premium dark-mode aesthetic, mobile-first responsive layout, and production-grade code structure.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?style=flat-square&logo=tailwindcss)

---

## ✨ Features

### Core Requirements ✅
- **📋 Applicant Listing** — Card/list view with name, email, college, skills & status
- **🔍 Search & Filter** — Real-time search by name/email/college/skill + filter by status
- **👤 Applicant Detail View** — Full profile modal on click with all info, links, and notes
- **➕ Add Applicant Form** — Fully validated multi-section form with react-hook-form
- **🌐 API Integration** — Fetches users from JSONPlaceholder with import-to-candidates feature

### Bonus Features ✅
- **🌙 Dark Mode** — Full dark/light theme toggle with persistence
- **📄 Pagination** — Smart paginator with ellipsis for large datasets
- **🔐 Authentication** — Login page with email/password validation and demo credentials
- **🔷 TypeScript** — Fully typed codebase
- **🗃️ State Management** — Zustand stores for auth, candidates, and theme
- **✨ Animations** — Framer Motion for cards, modals, and page transitions
- **📱 Mobile-first** — Fully responsive from 320px to 4K
- **✏️ Edit & Delete** — Full CRUD with confirmation dialogs
- **📊 Stats Overview** — Live dashboard metrics
- **🔄 Sort Controls** — Sort by name, date, or status (asc/desc)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | Framework |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Styling |
| **Zustand** | State management |
| **Framer Motion** | Animations |
| **React Hook Form** | Form validation |
| **Axios** | HTTP client |
| **React Hot Toast** | Notifications |
| **Lucide React** | Icons |

**API Used:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) — `/users` endpoint

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/upteky-hire.git
cd upteky-hire

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@upteky.com | admin123 |
| **Recruiter** | recruiter@upteky.com | recruit123 |

> Click the demo credential cards on the login page for quick access.

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout with SEO metadata
│   ├── page.tsx          # Entry point with auth guard
│   └── globals.css       # Global styles & animations
├── components/
│   ├── auth/
│   │   └── LoginPage.tsx         # Animated login with validation
│   ├── candidates/
│   │   ├── CandidateCard.tsx     # Animated applicant card
│   │   ├── CandidateDetail.tsx   # Full profile view
│   │   ├── AddCandidateForm.tsx  # Add/Edit form
│   │   └── SearchFilter.tsx      # Search + filter bar
│   ├── dashboard/
│   │   ├── Dashboard.tsx         # Main orchestrator component
│   │   ├── DashboardStats.tsx    # Stat cards overview
│   │   └── APIUsersPanel.tsx     # JSONPlaceholder API panel
│   ├── layout/
│   │   └── Navbar.tsx            # Sticky navbar with mobile menu
│   └── ui/                       # Reusable component library
│       ├── Avatar.tsx
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── Pagination.tsx
│       ├── Select.tsx
│       └── StatCard.tsx
├── lib/
│   ├── api.ts            # Axios API client
│   └── utils.ts          # Helpers & constants
├── store/
│   ├── authStore.ts      # Zustand auth state
│   ├── candidateStore.ts # Zustand candidates + filtering
│   └── themeStore.ts     # Zustand dark mode
└── types/
    └── index.ts          # TypeScript interfaces
```

---

## 🎨 Design Highlights

- **Glassmorphism** UI with `backdrop-blur` effects
- **Gradient avatars** auto-generated from name hash
- **Spring animations** using Framer Motion
- **Animated stat cards** with entrance delays
- **Active filter pills** for visual feedback
- **Skeleton loaders** for API data
- **Custom scrollbar** with violet accent

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository to [vercel.com](https://vercel.com) for automatic deployments.

### Netlify

```bash
npm run build
# Upload the .next folder or connect via GitHub
```

---

## 🧪 Evaluation Criteria Coverage

| Criteria | Implementation |
|---|---|
| **UI/UX & Responsiveness** | Dark/light mode, Framer Motion, mobile-first grid, glassmorphism |
| **Code Structure** | Feature-based folders, reusable UI lib, typed interfaces |
| **Functionality** | Full CRUD, search, filter, sort, pagination, detail view |
| **API Integration** | JSONPlaceholder users with loading/error states and import |
| **Validation & Error Handling** | react-hook-form validation, toast notifications |
| **GitHub/Deployment** | README, clean commits, Vercel-ready |

---

*Built with ❤️ for Upteky Developer Internship Task*
