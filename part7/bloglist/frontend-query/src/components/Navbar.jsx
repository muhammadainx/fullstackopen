import { Link } from 'react-router';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

import { useUser } from '../hooks/useUser';

const Navbar = () => {
  const { user, logoutUser } = useUser();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ mt: 2, mb: 2 }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            mr: 2,
          }}
        >
          Blog App
        </Typography>

        <Button component={Link} to="/" color="inherit">
          Blogs
        </Button>

        <Button component={Link} to="/users" color="inherit">
          Users
        </Button>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <>
              <Typography variant="body2">{user.username} logged in</Typography>

              <Button variant="outlined" size="small" onClick={logoutUser}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
