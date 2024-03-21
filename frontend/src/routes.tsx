import { createBrowserRouter } from 'react-router-dom';

import Default from './components/layout/Default';
import Home from './components/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);
