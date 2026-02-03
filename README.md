# TaskForge-DailyList

<p align="center">
  <strong>A feature-rich task management system with real-time statistics, filtering, and a modern responsive UI.</strong>
</p>

<p align="center">
  <a href="https://github.com/TuMinhHung0778/TaskForge-Project">GitHub</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#api-reference">API Reference</a>
</p>

---

## Overview

**TaskForge-DailyList** is a fullstack MERN application that lets users manage daily tasks with real-time analytics, date-range filtering (today, week, month, all), status filters (all / active / completed), and a polished UI built with Shadcn UI and Tailwind CSS. The backend uses MongoDB Aggregation Pipelines for efficient, single-query task listing and statistics.

---

## Features

### Core functionality

- **Full CRUD** — Create, read, update, and delete tasks with instant feedback via Sonner toasts
- **Real-time statistics** — Active and completed task counts computed in one aggregation query
- **Date-range filtering** — View tasks by **Today**, **This week**, **This month**, or **All time**
- **Status filtering** — Filter by **All**, **Active**, or **Completed**
- **Pagination** — Navigate task list with configurable page size
- **Inline editing** — Edit task title directly on the card with blur/Enter to save
- **Complete / uncomplete** — Toggle task status with one click; completed tasks show completion time

### User experience

- **Responsive layout** — Works on desktop and mobile with a centered, max-width content area
- **Modern UI** — Gradient cards, custom shadows, smooth transitions, and Lucide icons
- **Empty states** — Contextual messages when no tasks match the current filter
- **404 page** — Custom not-found page with link back to home
- **Client-side routing** — React Router for `/` and catch-all `*` (NotFound)

### Backend

- **RESTful API** — Clear resource-based routes and HTTP verbs
- **MongoDB Aggregation** — Single pipeline with `$match` + `$facet` for tasks + activeCount + completeCount
- **Structured responses** — JSON with `tasks`, `activeCount`, `completeCount` for list endpoint
- **Environment-based config** — CORS and static serving depend on `NODE_ENV`; production serves built frontend

---

## Tech Stack

| Layer        | Technologies                                                                                                |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| **Frontend** | React 19, Vite 7, React Router 7, Tailwind CSS 4, Shadcn UI (Radix primitives), Sonner, Axios, Lucide React |
| **Backend**  | Node.js, Express 4, Mongoose 9, dotenv, CORS                                                                |
| **Database** | MongoDB                                                                                                     |
| **Tooling**  | ESLint, Nodemon (dev)                                                                                       |

- **MERN**: MongoDB, Express, React, Node.js
- **UI**: Tailwind CSS, Shadcn UI (Dialog, Popover, Command, Pagination, Card, Button, Input, Badge)
- **Feedback**: Sonner for toast notifications
- **Build**: Vite for fast HMR and production builds

---

## Project structure

```
TaskForge-Project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── controllers/
│   │   │   └── tasksControllers.js # CRUD + aggregation logic
│   │   ├── models/
│   │   │   └── Task.js            # Mongoose schema (title, status, completedAt, timestamps)
│   │   ├── routes/
│   │   │   └── tasksRouters.js    # /api/tasks REST routes
│   │   └── server.js              # Express app, CORS, static serve in production
│   ├── package.json
│   └── .env                       # PORT, MONGODB_CONNECTIONSTRING, NODE_ENV
├── frontend/
│   ├── src/
│   │   ├── components/            # AddTask, TaskCard, TaskList, TaskEmptyState, StatsAndFilters,
│   │   │   ├── ui/               #   DateTimeFilter, TaskListPagination, Header, Footer
│   │   │   └── ...               #   Shadcn UI primitives (button, card, dialog, etc.)
│   │   ├── pages/
│   │   │   ├── HomePage.jsx       # Main task list + filters + pagination
│   │   │   └── NotFound.jsx       # 404 page
│   │   ├── lib/
│   │   │   ├── axios.js           # API client (baseURL dev/prod)
│   │   │   ├── data.js            # Filter labels, date options, pagination limit
│   │   │   └── utils.js           # cn() etc.
│   │   ├── App.jsx                # Router + Sonner Toaster
│   │   ├── main.jsx
│   │   └── index.css              # Tailwind + CSS variables (theme)
│   ├── public/
│   ├── index.html
│   ├── vite.config.js            # React plugin, Tailwind, @ alias
│   ├── tailwind.config.js
│   └── package.json
├── package.json                  # Root scripts: build, start
├── README.md
└── .gitignore
```

---

## Getting started

### Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (local instance or Atlas connection string)
- **npm** (or yarn/pnpm)

### 1. Clone the repository

```bash
git clone https://github.com/TuMinhHung0778/TaskForge-Project.git
cd TaskForge-Project
```

### 2. Environment setup

Create a `.env` file in the `backend/` directory:

```env
PORT=5001
NODE_ENV=development
MONGODB_CONNECTIONSTRING=mongodb://localhost:27017/taskforge
```

Replace `MONGODB_CONNECTIONSTRING` with your MongoDB URI (e.g. MongoDB Atlas connection string).

### 3. Install dependencies

From the project root:

```bash
# Install root + backend + frontend dependencies
npm install
npm install --prefix backend
npm install --prefix frontend
```

Or from each folder:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 4. Run the application

**Development (recommended):**

- **Backend** (from project root or `backend/`):

  ```bash
  npm run start --prefix backend
  # or: cd backend && npm run dev   # with nodemon
  ```

  Server runs at `http://localhost:5001` (or the `PORT` in `.env`).

- **Frontend** (from project root or `frontend/`):
  ```bash
  cd frontend && npm run dev
  ```
  App runs at `http://localhost:5173` and uses `http://localhost:5001/api` in development.

**Production:**

- Build frontend and run backend (serves API + static frontend):
  ```bash
  npm run build
  npm run start
  ```
  Open `http://localhost:5001` (or your `PORT`). The backend serves the built React app for non-API routes.

### 5. Root scripts (from project root)

| Script          | Description                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| `npm run build` | Install backend + frontend deps and run `vite build` in `frontend/`                          |
| `npm run start` | Start backend only (`node backend/src/server.js`) — use after `npm run build` for production |

---

## API reference

Base URL (dev): `http://localhost:5001/api`

### Tasks

| Method   | Endpoint     | Description                                            |
| -------- | ------------ | ------------------------------------------------------ |
| `GET`    | `/tasks`     | List tasks with optional date filter and return counts |
| `POST`   | `/tasks`     | Create a task                                          |
| `PUT`    | `/tasks/:id` | Update a task (title, status, completedAt)             |
| `DELETE` | `/tasks/:id` | Delete a task                                          |

### Query parameters

- **GET /tasks**
  - `filter` (optional): `today` | `week` | `month` | `all` — filters tasks by `createdAt` range. Default: `today`.

### Request/response examples

**GET /tasks?filter=week**

Response:

```json
{
  "tasks": [
    {
      "_id": "...",
      "title": "Task title",
      "status": "active",
      "completedAt": null,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "activeCount": 5,
  "completeCount": 3
}
```

**POST /tasks**

Body: `{ "title": "New task title" }`
Response: the created task object (201).

**PUT /tasks/:id**

Body: `{ "title": "...", "status": "active"|"complete", "completedAt": null|ISO date }`
Response: updated task object (200).

**DELETE /tasks/:id**

Response: deleted task object (200).
Errors: 404 if task not found, 500 on server error.

---

## Architecture highlights

- **Backend**: Express app with JSON middleware, CORS restricted to frontend origin in development, route mounting at `/api/tasks`, and optional static serving of `frontend/dist` in production. Database connection is established before listening on `PORT`.
- **Frontend**: Single-page app with React Router; `HomePage` fetches tasks (and counts) based on `dateQuery` (today/week/month/all), applies client-side status filter (all/active/completed), and paginates the result. All API calls go through `lib/axios.js` (baseURL switches by `import.meta.env.MODE`).
- **Data flow**: List endpoint uses one Mongoose aggregation: `$match` by date range, then `$facet` to get sorted tasks, `activeCount`, and `completeCount` in a single round-trip.

---

## License

ISC

---

## Author

**Tu Minh Hung**
GitHub: [TuMinhHung0778](https://github.com/TuMinhHung0778)
Project: [TaskForge-Project](https://github.com/TuMinhHung0778/TaskForge-Project)
