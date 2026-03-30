import { useQuery } from '@tanstack/react-query';

import blogService from '../services/blogs';

export const useBlogById = (id) => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    select: (blogs) => blogs.find((b) => b.id === id),
  });

  return { blog: result.data };
};
