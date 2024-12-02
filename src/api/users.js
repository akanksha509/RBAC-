import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import mockData from "../data/mockData";

let users = mockData.users;

// Sign In
export const fakeAsyncGetSession = async (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData.get("password") === "#Hello654#") {
        resolve({
          user: {
            name: "Akanksha Thakur",
            email: formData.get("email") || "",
            image: "",
          },
        });
      }
      reject(new Error("Incorrect credentials."));
    }, 1000);
  });
};

// Users API
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => Promise.resolve([...users]),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser) => {
      const userToAdd = {
        ...newUser,
        user_id: `user_${Date.now()}`,
      };
      users = [...users, userToAdd];
      return Promise.resolve(userToAdd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser) => {
      users = users.map((user) =>
        user.user_id === updatedUser.user_id ? updatedUser : user
      );
      return Promise.resolve(updatedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => {
      users = users.filter((user) => user.user_id !== userId);
      return Promise.resolve(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
