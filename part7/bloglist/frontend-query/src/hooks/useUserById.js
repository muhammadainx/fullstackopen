import { useQueryClient } from '@tanstack/react-query';

export const useUserById = (id) => {
  const queryClient = useQueryClient();

  const users = queryClient.getQueryData(['users']);
  const user = users?.find((u) => u.id === id);

  return { user };
};
