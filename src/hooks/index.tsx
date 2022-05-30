import React from 'react';

import { RequestProvider } from './request';

const AppProvider: React.FC = ({ children }) => (
  <RequestProvider>{children}</RequestProvider>
);

export default AppProvider;
