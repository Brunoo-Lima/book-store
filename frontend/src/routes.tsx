import { createBrowserRouter } from 'react-router-dom';

import Default from './components/layout/Default';
import Home from './components/Home';
import Register from './components/screens/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/registerBook',
        element: <Register />,
      },
    ],
  },
]);
