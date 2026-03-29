import { useParams } from 'react-router';

import { useUserById } from '../hooks/useUserById';

const User = () => {
  const { id } = useParams();

  const { user } = useUserById(id);

  if (!user) {
    return <div>user not found!</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
