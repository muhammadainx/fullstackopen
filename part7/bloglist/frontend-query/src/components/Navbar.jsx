import { Link } from 'react-router';

import { useUser } from '../hooks/useUser';

const Navbar = () => {
  const { user, logoutUser } = useUser();

  const styles = {
    nav: {
      background: 'lightgrey',
      padding: '10px',
      borderRadius: '5px',
    },
    navInner: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    userSection: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>

        {user && (
          <div style={styles.userSection}>
            <span>{user.username} logged in</span>
            <button onClick={logoutUser}>logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
