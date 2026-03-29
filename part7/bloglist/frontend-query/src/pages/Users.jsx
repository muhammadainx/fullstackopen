import { Link } from 'react-router';
import { useUsers } from '../hooks/useUsers';

const Users = () => {
  const { users, isLoading, isError } = useUsers();

  if (isLoading) {
    return <div>Loading users data...</div>;
  }

  if (isError) {
    return <div>blog service not available due to problems in server</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
