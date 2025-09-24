# Task Manager

A Kanban-style project management web application with authentication and role-based access.

## Live Demo

[Task Manager](https://k-shestakov.github.io/task-manager)

## Technologies Used

- **Build Tool**: Create React App (CRA)
- **Frontend**: React, TypeScript, Tailwind CSS, SCSS, Flowbite
- **State Management**: Zustand
- **Routing**: react-router-dom
- **Drag & Drop**: @hello-pangea/dnd
- **Notifications**: react-toastify
- **Backend**: json-server (hosted on [Railway](https://github.com/k-shestakov/task-manager-api))
- **Version Control**: Git, GitHub

## How to Run the Project Locally

- Fork the repository
- Clone the forked repo
```bash
git clone https://github.com/k-shestakov/task-manager.git
cd task-manager
npm install
npm start
```

### Node.js Version: Make sure you're using Node.js v20.17.0 to ensure compatibility.

## Project Structure

```bash
src/
├── modules/        # All components and pages
├── services/       # Helper functions
├── stores/         # Global Zustand store
├── styles/         # SCSS styles
├── types/          # TypeScript types and interfaces
├── App.tsx         # Root component
├── App.scss        # Global styles & Tailwind config
├── Root.tsx        # Routing configuration
└── index.tsx       # Entry point
```

## Test User Accounts

| Role            | Login | Password |
|-----------------|-------|----------|
| Admin           | admin | admin    |
| Project Manager | pm    | pm       |
| Team Member     | tm    | tm       |

## Pages Overview

### LoginPage
- Log in with an existing account
- Register a new user

### HomePage
- Displays information about the currently logged-in user

### ProjectsPage
- View list of all projects
- CRUD operations available to Admin and Project Manager

### TasksPage
- Kanban board for each project
- Drag-and-drop supported for task statuses

### TaskDetailsPage
- Full details of a selected task
- CRUD operations available to Admin and Project Manager

### PeoplesPage
- List of all registered users
- Only accessible by Admin
- Full CRUD support

### NotFoundPage
- Displays 404 error for unknown routes

## Database Structure

```js
{
  "projects": [
    {
      "id": 1,
      "title": "Projec1",
      "description": "Some desc",
      "status": "Planned",
      "peoples": [],
      "tasks": [],
      "date": "2025-04-28",
      "dateEnd": "2025-04-30"
    },
  ],
  "peoples": [
    {
      "id": 0,
      "firstName": "admin",
      "lastName": "admin",
      "login": "admin",
      "password": "admin",
      "role": "Admin",
      "projects": [],
      "task": []
    },
  ]
}
```

### `Project` Interface

```ts
export interface Project {
  id: ID;
  title: string;
  description: string;
  peoples: People[];
  tasks: Task[];
  date: string;
  dateEnd: string;
  status: Statuses;
}
```

### `People` Interface

```ts
export interface People {
  id: ID;
  firstName: string;
  lastName: string;
  role: Roles;
  login: string;
  password: string;
  projects: Project[];
  task?: Task[];
}
```

## Deployment

- **Frontend** deployed via GitHub Pages:  
  [Task Manager](https://k-shestakov.github.io/task-manager)

- **Backend API** hosted on Railway:  
  [task-manager-api](https://github.com/k-shestakov/task-manager-api)
