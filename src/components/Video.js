import React from 'react';
import {
  Box,
} from '@material-ui/core';

export const Video = React.forwardRef(({
  ...props
}, ref) => {
  return (
    <Box
      component="video"
      autoPlay
      ref={ref}
      {...props}
    />
  );
});

