import { useQuery } from '@tanstack/react-query';

import userService from '../services/users';

export const useUsers = () => {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  return {
    users: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
  };
};
