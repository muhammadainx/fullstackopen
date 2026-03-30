import { useState, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';

const Togglable = ({ buttonLabel, children, ref }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <Button
          variant="contained"
          color="primary"
          onClick={toggleVisibility}
          sx={{ mt: 2 }}
        >
          cancel
        </Button>
      </div>
    </div>
  );
};

export default Togglable;
