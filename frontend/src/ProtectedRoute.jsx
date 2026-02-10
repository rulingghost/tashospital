
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { useRefreshTokenMutation } from './store/patient2';
import { useEffect } from 'react';
import { setAuth } from './store/authSlice';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const dispatch = useDispatch();
  const { token, refreshToken  } = useSelector(state => state.auth);
  const role = useSelector(state => state.auth.role);
  const [refreshTokenRequest, { isLoading, error }] = useRefreshTokenMutation();
  console.log("xxx");
  try {
    
    
    console.log();
    console.log();
    
    const decodedToken = jwtDecode(token); // Tokeni decode et.
    console.log(decodedToken);
    const userRole = decodedToken.role; // Role bilgisini al.
    console.log("Kullanıcı Rolü:", userRole);
  } catch (error) {
    console.error("Geçersiz token:", error.message);
  }
  
  useEffect(() => {
    const getNewAccessToken = async () => {
      console.log("koda girdi");
      
      if (!refreshToken) return;

      try {
        console.log("refresh çalıştı");
        
        const response = await refreshTokenRequest(refreshToken).unwrap();
        
        if (response) {
            console.log("Yeni token:", response);
          dispatch(setAuth({
            token: response.access,
            refreshToken: response.refresh,
            user: 'user_name', 
            role: 'user_role',
          }));

          localStorage.setItem('accessToken', response.access);
          localStorage.setItem('refreshToken', response.refresh);
        }
      } catch (error) {
        console.error('Yeni token alınırken hata oluştu:', error);
      }
    };

    if (!token && refreshToken) {
      getNewAccessToken();
    }
  }, [token, refreshToken, dispatch, refreshTokenRequest]);

  if (!token && !refreshToken) return <Navigate to="/login" />
//   if (!role || (allowedRoles && !allowedRoles.includes(role)))  return <Navigate to="/unauthorized" />
 
  return children
}

export default ProtectedRoute;
