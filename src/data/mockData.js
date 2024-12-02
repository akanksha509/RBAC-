// Mock data - Using let to make arrays mutable
let users = [
  {
    user_id: "1",
    name: "John Doe",
    avatar: "",
    status: "Active",
    role_id: "admin",
  },
];

let roles = [
  {
    role_id: "admin",
    role_name: "Administrator",
    role_description: "Full system access",
    resources: [
      {
        resource_id: "user_management",
        allowed_actions: ["create", "read", "update", "delete"],
      },
    ],
  },
];

let resources = [
  {
    resource_id: "user_management",
    resource_name: "User Management",
    description: "Manage system users",
    actions: ["create", "read", "update", "delete"],
  },
];

const mockData = {
  users,
  roles,
  resources,
};

export default mockData;
