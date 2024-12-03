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
- Navigation menu for Users, Roles, and Permissions pages
  ![Screenshot 2024-12-03 115038](https://github.com/user-attachments/assets/561c1251-bd12-4078-ad52-5fc542294c03)
  
- User profile menu with sign-out functionality
  ![Screenshot 2024-12-03 115101](https://github.com/user-attachments/assets/717a7cfd-58f4-419d-8206-f385436b9a5e)

- Clean and intuitive user interface

### Common Features Across Pages

- Material UI DataGrid for data display
- Advanced column features:
  - Sorting
    ![Screenshot 2024-12-03 135538](https://github.com/user-attachments/assets/c5654af0-4a78-4268-a749-a4e2c9fce99b)
    (The resource names are in ascending order)
    ![Screenshot 2024-12-03 135551](https://github.com/user-attachments/assets/e0796825-7727-4d6a-8c9f-63d52abcc7ff)
    
  - Filtering
    ![Screenshot 2024-12-03 135712](https://github.com/user-attachments/assets/2b665665-4d8e-47e9-8c70-8475d98ff1c4)

  - Column visibility toggle
    ![Screenshot 2024-12-03 120243](https://github.com/user-attachments/assets/b80f732a-6c26-475a-91a2-144ca2b8da57)
    (Here the Avatar column disappears)
    ![Screenshot 2024-12-03 120252](https://github.com/user-attachments/assets/fd3c9dbf-842c-4343-8f9a-772f4bb5fd61)
    
- Search functionality in the tables
  ![Screenshot 2024-12-03 120034](https://github.com/user-attachments/assets/a2a8b65b-709a-455a-a033-1d6ba50c4906)
  
- Pagination with customizable rows per page
- Success/Error notifications for all CRUD operations
  ![Screenshot 2024-12-03 115749](https://github.com/user-attachments/assets/d7a6eb5e-738c-445b-a7b5-6d34ee812f3d)
   
- Confirmation dialogs for delete operations
  ![Screenshot 2024-12-03 141143](https://github.com/user-attachments/assets/b8da2683-a73a-4e8c-b933-f5bbc6f9e5b2)

### Users Management

- View all users in a sortable and filterable grid
- Export functionality for user data
- Create new users with:
  - Username
  - Status (Active/Inactive/Invited/Deleted)
  - Role assignment (dynamically populated from available roles)
  ![Screenshot 2024-12-03 115830](https://github.com/user-attachments/assets/03f119e8-94e6-418a-ad26-4e04b120d2f8)

- Edit users:
  - Inline editing for status and role
    ![Screenshot 2024-12-03 142109](https://github.com/user-attachments/assets/96099fb2-e190-4b08-a9bd-b86c1519850d)
    
  - Full edit through dialog
    ![Screenshot 2024-12-03 142046](https://github.com/user-attachments/assets/f3be3574-008d-4cc7-95a6-f12f4dfecb87)

- Delete users with confirmation
  ![Screenshot 2024-12-03 142315](https://github.com/user-attachments/assets/5ad4d7a2-bef1-4904-b4d9-0878d55beafe)

- Print and Download the users data
  ![Screenshot 2024-12-03 120006](https://github.com/user-attachments/assets/54de684e-6a27-4b80-b153-439a1c77db32)

### Permissions Management

- View all resources in a sortable and filterable grid
- Create and manage resources with:
  - Resource name
  - Description
  - Customizable actions (create, share, grant, delete, etc.)
  ![Screenshot 2024-12-03 115346](https://github.com/user-attachments/assets/d805a069-46c1-4928-904e-451fbb068ffc)

- Edit existing resources
  ![Screenshot 2024-12-03 142853](https://github.com/user-attachments/assets/3954a2f6-cabe-4926-8e6c-bec7616c02ce)
  
- Delete resources with impact assessment
  ![Screenshot 2024-12-03 142904](https://github.com/user-attachments/assets/c53fd1b0-dc3e-446d-9d8c-58361734c722)

### Roles Management

- View all roles in a sortable and filterable grid
- Create custom roles with:
  - Role name
  - Description
  - Resource selection
  - Granular permission control per resource
  ![Screenshot 2024-12-03 115721](https://github.com/user-attachments/assets/1b3548a8-a71e-499f-b490-3d6adfe53dde)

- Edit existing roles
  ![Screenshot 2024-12-03 143424](https://github.com/user-attachments/assets/b8ea1e13-19ae-4543-b91b-12a94014ba44)

- Delete roles with confirmation
  ![Screenshot 2024-12-03 143439](https://github.com/user-attachments/assets/2d38450f-b69e-4b3b-99d4-6d258e9f742b)

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
