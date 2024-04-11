import { createBrowserRouter } from 'react-router-dom';

import Default from './components/layout/Default';
import Home from './Home/Home';
import Register from './components/book/Register';
import Consult from './components/book/Consult';
import CreateUser from './components/user/CreateUser';
import EditBook from './components/book/modal/EditBook';

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
      {
        path: '/user',
        element: <CreateUser />,
      },
      {
        path: '/edit/:id',
        element: <EditBook />,
      },
    ],
  },
]);
