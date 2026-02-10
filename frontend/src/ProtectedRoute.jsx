import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useRefreshTokenMutation } from './store/patient2';
import { setAuth, logout } from './store/authSlice';
import Loading from './components/tools/Loading';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const dispatch = useDispatch();
  const { token, refreshToken  } = useSelector(state => state.auth);
  const role = useSelector(state => state.auth.role);
  const [refreshTokenRequest, { isLoading, error }] = useRefreshTokenMutation();
  
  useEffect(() => {
    const getNewAccessToken = async () => {
      if (!refreshToken) return;
      try {
        const response = await refreshTokenRequest(refreshToken).unwrap();
        if (response) {
          dispatch(setAuth({
            token: response.access,
            refreshToken: response.refresh || refreshToken,
            user: 'user_name', 
            role: 'user_role',
          }));
          localStorage.setItem('accessToken', response.access);
          if (response.refresh) {
            localStorage.setItem('refreshToken', response.refresh);
          }
        }
      } catch (error) {
        console.error('Yeni token alınırken hata oluştu:', error);
        dispatch(logout());
      }
    };

    if (!token && refreshToken) {
      getNewAccessToken();
    }
  }, [token, refreshToken, dispatch, refreshTokenRequest]);

  if (isLoading) return <Loading />;
  if (!token && refreshToken) return <Loading />;
  if (!token && !refreshToken) return <Navigate to="/login" />;
 
  return children;
}

export default ProtectedRoute;
