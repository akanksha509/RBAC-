# RBAC Dashboard

A React-based Role-Based Access Control (RBAC) dashboard built with Material UI and React Query. This application provides a comprehensive interface for managing users, roles, and permissions with a modern and responsive design.

## Features

### Authentication

- Secure sign-in page with email and password validation
- Password requirement: #Hello654#
- Form validation with error messages
- Protected routes for authenticated users

### Dashboard Layout

- Material UI Toolpad-based responsive design
- Dark/Light theme toggle
- User profile menu with sign-out functionality
- Navigation menu for Users, Roles, and Permissions pages
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
git clone https://github.com/yourusername/rbac-dashboard.git
cd rbac-dashboard
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
├── components/          # Reusable UI components
├── data/               # Mock data and API simulation
├── pages/              # Main page components
├── services/           # API services and React Query hooks
├── hooks/              # Custom hooks
├── theme/              # Theme configuration
├── types/              # TypeScript types/interfaces
├── utils/              # Utility functions
└── App.tsx             # Main application component
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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
