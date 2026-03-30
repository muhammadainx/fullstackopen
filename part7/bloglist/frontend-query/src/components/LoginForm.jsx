import { useState } from 'react';
import { Button, TextField, Stack } from '@mui/material';

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
      <Stack spacing={2} sx={{ maxWidth: 400 }}>
        <TextField
          label="username"
          size="small"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          label="password"
          size="small"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit" color="primary" variant="contained">
          login
        </Button>
      </Stack>
    </form>
  );
};
export default LoginForm;
