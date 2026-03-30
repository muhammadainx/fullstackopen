import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useNotification } from './useNotification';

import blogService from '../services/blogs';

export const useBlogs = () => {
  const queryClient = useQueryClient();
  const { setNotification } = useNotification();

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const createBlog = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(['blogs'], (old = []) => old.concat(newBlog));

      setNotification({
        message: `A new blog "${newBlog.title}" by ${newBlog.author} added!`,
        status: 'success',
      });
    },
    onError: (error) => {
      setNotification({
        message: error.response?.data?.error || 'Something went wrong',
        status: 'error',
      });
    },
  });

  const likeBlog = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      );
    },
    onError: () => {
      setNotification({
        message: 'Failed to update like count',
        status: 'error',
      });
    },
  });

  const deleteBlog = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.filter((b) => b.id !== deletedId),
      );

      setNotification({
        message: 'Blog deleted successfully',
        status: 'success',
      });
    },
    onError: (error) => {
      setNotification({
        message: error.response?.data?.error || 'Something went wrong',
        status: 'error',
      });
    },
  });

  const addComment = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (old = []) =>
        old.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      );
    },
    onError: () => {
      setNotification({
        message: 'Failed to add comment',
        status: 'error',
      });
    },
  });

  return {
    blogs: blogsQuery.data ?? [],
    isLoading: blogsQuery.isLoading,
    isError: blogsQuery.isError,
    createBlog: createBlog.mutate,
    likeBlog: likeBlog.mutate,
    deleteBlog: deleteBlog.mutate,
    addComment: addComment.mutate,
  };
};
