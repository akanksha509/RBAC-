import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import mockData from "../data/mockData";

let users = mockData.users;
let roles = mockData.roles;

// Roles API
export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => Promise.resolve([...roles]),
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRole) => {
      const roleToAdd = {
        ...newRole,
        role_id: `role_${Date.now()}`,
      };
      roles = [...roles, roleToAdd];
      return Promise.resolve(roleToAdd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedRole) => {
      roles = roles.map((role) =>
        role.role_id === updatedRole.role_id ? updatedRole : role
      );
      return Promise.resolve(updatedRole);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleId) => {
      roles = roles.filter((role) => role.role_id !== roleId);
      users = users.map((user) => {
        if (user.role_id === roleId) {
          return {
            ...user,
            role_id: null,
            status: "inactive",
          };
        }
        return user;
      });
      return Promise.resolve(roleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
