import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BlogForm from './BlogForm';

test('calls createBlog with correct details when form is submitted', async () => {
  const createBlogMock = vi.fn();

  render(<BlogForm createBlog={createBlogMock} />);

  const user = userEvent.setup();

  await user.type(screen.getByLabelText('Title:'), 'React Blog');
  await user.type(screen.getByLabelText('Author:'), 'Jan Smith');
  await user.type(screen.getByLabelText('Url:'), 'https://example.com');

  await user.click(screen.getByText('create'));

  expect(createBlogMock).toHaveBeenCalledTimes(1);
  expect(createBlogMock).toHaveBeenCalledWith({
    title: 'React Blog',
    author: 'Jan Smith',
    url: 'https://example.com',
  });
});
