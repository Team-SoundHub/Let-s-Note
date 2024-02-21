import React from 'react';

const MouseContext = React.createContext({
  throttledMouseMove: () => {},
});

export default MouseContext;
