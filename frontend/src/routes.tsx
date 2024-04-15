import { createBrowserRouter } from 'react-router-dom';

import Default from './components/layout/Default';
import Home from './Home/Home';
import Register from './components/book/Register';
import ConsultBook from './components/book/ConsultBook';
import CreateUser from './components/user/CreateUser';
import EditBook from './components/book/EditBook';
import StatusBook from './components/book/StatusBook';

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
        element: <ConsultBook />,
      },
      {
        path: '/user',
        element: <CreateUser />,
      },
      {
        path: '/edit/:id',
        element: <EditBook />,
      },
      {
        path: '/status/:id',
        element: <StatusBook />,
      },
    ],
  },
]);
