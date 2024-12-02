import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import mockData from "../data/mockData";

let resources = mockData.resources;
let roles = mockData.roles;

// Resources API
export const useResources = () => {
  return useQuery({
    queryKey: ["resources"],
    queryFn: () => Promise.resolve([...resources]), // Return a copy of the array
  });
};

export const useCreateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newResource) => {
      const resourceToAdd = {
        ...newResource,
        resource_id: `resource_${Date.now()}`,
      };
      resources = [...resources, resourceToAdd]; // Create new array instead of using push
      return Promise.resolve(resourceToAdd);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
};

export const useUpdateResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedResource) => {
      resources = resources.map((resource) =>
        resource.resource_id === updatedResource.resource_id
          ? updatedResource
          : resource
      );
      return Promise.resolve(updatedResource);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
    },
  });
};

export const useDeleteResource = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resourceId) => {
      resources = resources.filter(
        (resource) => resource.resource_id !== resourceId
      );
      // Update roles to remove the deleted resource
      roles = roles.map((role) => ({
        ...role,
        resources: role.resources.filter((r) => r.resource_id !== resourceId),
      }));
      return Promise.resolve(resourceId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
