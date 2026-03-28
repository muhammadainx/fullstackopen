import { useState } from 'react';

import { useUser } from '../hooks/useUser';
import { useNotification } from '../hooks/useNotification';

import loginService from '../services/login';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useUser();
  const { setNotification } = useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      loginUser(user);

      setUsername('');
      setPassword('');
    } catch {
      setNotification({
        message: 'invalid username or password',
        status: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );
};
export default LoginForm;
