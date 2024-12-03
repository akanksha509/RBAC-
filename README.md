# RBAC Dashboard

A React-based Role-Based Access Control (RBAC) dashboard built with Material UI and React Query. This application provides a comprehensive interface for managing users, roles, and permissions with a modern and responsive design.

## Features

### Authentication

- Secure sign-in page with email and password validation
- Password requirement: #Hello654#
  ![Screenshot 2024-12-03 114935](https://github.com/user-attachments/assets/15c69184-7214-41f2-8f42-b3ed97f97d48)

- Form validation with error messages
  ![Screenshot 2024-12-03 125649](https://github.com/user-attachments/assets/f2684d87-3297-4af2-89f9-9b469db27a48)

- Protected routes for authenticated users

### Dashboard Layout

- Material UI Toolpad-based responsive design
- Dark/Light theme toggle
  ![Screenshot 2024-12-03 115038](https://github.com/user-attachments/assets/561c1251-bd12-4078-ad52-5fc542294c03)
  
- User profile menu with sign-out functionality
  ![Screenshot 2024-12-03 115101](https://github.com/user-attachments/assets/717a7cfd-58f4-419d-8206-f385436b9a5e)

- Navigation menu for Users, Roles, and Permissions pages
  <div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/user-attachments/assets/516b3765-b985-424a-99ca-86f2e60d44d8" width="300" />
  <img src="https://github.com/user-attachments/assets/796a40f6-847c-4cc6-ae52-6ca34d5da458" width="300" />
</div>
- Clean and intuitive user interface

### Common Features Across Pages

- Material UI DataGrid for data display
- Advanced column features:
  - Sorting
  - Filtering
  - Column visibility toggle
  - Column reordering
- Search functionality in the tables
- Pagination with customizable rows per page
- Success/Error notifications for all CRUD operations
- Confirmation dialogs for delete operations

### Users Management

- View all users in a sortable and filterable grid
- Export functionality for user data
- Create new users with:
  - Username
  - Status (Active/Inactive/Invited/Deleted)
  - Role assignment (dynamically populated from available roles)
- Edit users:
  - Inline editing for status and role
  - Full edit through dialog
- Delete users with confirmation

### Permissions Management

- View all resources in a sortable and filterable grid
- Create and manage resources with:
  - Resource name
  - Description
  - Customizable actions (create, share, grant, delete, etc.)
- Edit existing resources
- Delete resources with impact assessment

### Roles Management

- View all roles in a sortable and filterable grid
- Create custom roles with:
  - Role name
  - Description
  - Resource selection
  - Granular permission control per resource
- Edit existing roles
- Delete roles with confirmation
- Dynamic resource and permission assignment

## Technology Stack

- React (Vite)
- Material UI
- React Query
- React Router
- JavaScript

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git https://github.com/akanksha509/RBAC-.git
cd RBAC-
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

## Project Structure

```
src/
├── api/                # Custom hooks and API-related logic
├── components/         # Reusable UI components
├── data/               # Mock data 
├── layouts/            # Layout components for consistent structure
├── pages/              # Main page components
├── SessionContext.js   # Context for session and global state
├── main.jsx            # Entry point for the React app
└── App.jsx             # Root component with routes and high-level logic

```

## Usage

1. Sign in using any email and password should be: #Hello654#

2. Navigate through the dashboard using the sidebar menu

3. Users Management:

   - Create users with the "Create User" button
   - Edit users using the pencil icon or inline editing
   - Delete users using the delete icon
   - Export user data using the export button

4. Permissions Management:

   - Create resources with the "Create Resource" button
   - Define resource actions
   - Manage existing resources

5. Roles Management:
   - Create roles and assign permissions
   - Select resources and configure their access levels
   - Manage existing roles

## Demo Link 
https://rbacakankshathakur.vercel.app/

## Video Link 
