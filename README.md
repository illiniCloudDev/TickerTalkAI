# TickerTalk AI 📊

TickerTalk AI is a full-stack, low-contrast dark-themed financial analytics hub built to empower retail investors. By interfacing seamlessly with the official SEC EDGAR system, the platform normalizes raw corporate metadata, visualizes company structural profiles, tracks corporate actions, and breaks down complex financial filings into clean, digestible data.

---

## 🛠️ Tech Stack & Architecture

The repository uses a split-directory monolith design separating concerns between client and server layers:

* **Frontend:** React 18+, Vite, Tailwind CSS (Custom Dark Slate Aesthetic)
* **Backend:** Node.js, Express, Native Fetch Integration
* **Data Source:** SEC EDGAR REST API Ecosystem

TICKERTALK AI/
├── backend/            # Express REST API (Handles SEC communications & rate-limiting)
│   ├── node_modules/
│   ├── package.json
│   └── server.js
└── frontend/           # Vite + React App (Responsive Multi-Column UI)
├── src/
│   ├── components/ # SearchBar, SideBar, etc.
│   ├── App.jsx     # Global UI Router & Consolidated Core State
│   └── main.jsx
├── package.json
└── vite.config.js

---

## ✨ Features Implemented

* **Dual-Column Dashboard Layout:** Real-time modular interface maximizing modern widescreen viewport space.
* **Smart Ticker-to-CIK Synchronization:** On server boot, the backend automatically maps active public market tickers directly to raw numerical 10-digit zero-padded Central Index Keys (CIK).
* **SEC Filing Explorer:** Lookup engine translating numerical identities into clear corporate identities, eliminating invalid alpha queries safely.
* **Recent Filing Live Feed:** Dynamic real-time mapping of corporate form submissions (`10-K`, `10-Q`, `8-K`) matching publication timelines.
* **Low-Strain Dim UI Theme:** Styled meticulously utilizing pure Tailwind CSS slate configurations designed for extended financial research without eye fatigue.

---

## 🚀 Local Installation & Quick Start

Follow these steps to spin up both components of your application locally:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16 or higher) installed on your system.

### 2. Clone and Setup Backend
Open your terminal from the project's root directory:

```bash
# Navigate to the API layer
cd backend

# Install dependencies (Express, Axios, Cors, Dotenv)
npm install

# Start the local Express server (Defaults to Port 8080)
node server.js

Note: The server will announce when the SEC master ticker list maps have finished downloading before accepting incoming queries.

### 3. Setup FrontEnd Client 
Open a second terminal window or split your current terminal, remaining at the project root directory:
# Navigate to the UI layer
cd frontend

# Install UI and utility dependencies
npm install

# Boot up the local Vite development environment
npm run dev

📡 Core API Points Logged
The backend acts as an endpoint mediator communicating directly with data.sec.gov.

Company General Submissions: GET http://localhost:8080/api/company/:query

Accepts: A market ticker symbol (e.g. SOFI, MSFT) or a raw CIK integer.

Resolves: General organizational attributes, historical tickers, exchange alignments, and recent submission arrays.

---
🗺️ Future Roadmap
[ ] AI Digest Integration: Embed large language model processing agents to dynamically read primary documents (Form 10-K/Q) and extract explicit operational changes.

[ ] Financial Cheat Sheet Module: Interactive UI components compiling balance sheet structural shifts directly from api/xbrl/companyfacts datasets.

[ ] Red Flags Smart Filter: Auto-highlight parameters tracking anomalies like sudden controller resignations (8-K) or heavy executive liquidation events (Form 4).
---

### 💡 Pro Tip for Running This Project
Since your backend and frontend exist in two different directories, you constantly have to run two terminal commands. If you want to run your entire app with a single command from your root directory in the future, you can install a package called **`concurrently`**. 

Let me know if you want to add a main `package.json` file to the root folder to handle that script shortcut!