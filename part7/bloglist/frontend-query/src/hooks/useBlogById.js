import { useQueryClient } from '@tanstack/react-query';

export const useBlogById = (id) => {
  const queryClient = useQueryClient();

  const blogs = queryClient.getQueryData(['blogs']);
  const blog = blogs?.find((b) => b.id === id);

  return { blog };
};
