import { createBrowserRouter } from 'react-router-dom';

import Default from './components/layout/Default';
import Home from './components/Home';
import Register from './components/book/Register';
import Consult from './components/book/Consult';

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
        path: '/register',
        element: <Register />,
      },
      {
        path: '/consult',
        element: <Consult />,
      },
    ],
  },
]);
