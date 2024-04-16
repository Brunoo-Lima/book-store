import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { UserProvider } from './context/UserContext.tsx';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/ReactToastify.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <ToastContainer />
      <App />
    </UserProvider>
  </React.StrictMode>
);
