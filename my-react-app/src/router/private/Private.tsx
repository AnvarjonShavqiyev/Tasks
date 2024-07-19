import { Navigate, Outlet } from 'react-router-dom';
import { validateToken } from '@helpers/index';

const Private = () => {
  const user = JSON.parse(localStorage.getItem('user') ?? 'null');
  const token = localStorage.getItem('token') ?? 'null';
  return user && token && validateToken(token) ? (
    <Outlet />
  ) : (
    <Navigate to={'/signIn'} />
  );
};

export default Private;
