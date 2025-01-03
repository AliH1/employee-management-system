import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useContext(UserContext);
  return user.name !== '' ? children : <Navigate to='/login'/>;
};