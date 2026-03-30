import { useNotification } from '../hooks/useNotification';
import { Alert } from '@mui/material';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div>
      {notification.message && (
        <Alert severity={notification.status}>{notification.message}</Alert>
      )}
    </div>
  );
};

export default Notification;
