import { Outlet, useNavigate } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import { usePageLoader } from './hooks/usePageLoader';
import Loader from './common/Loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/features/authSlice';
import apiClient from './api/axios';

function App() {
  const { isLoading, shouldRender } = usePageLoader();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const userId = localStorage.getItem('userId');

      if (userId) {
        try {
          const response = await apiClient.get(`/users/${userId}`);
          const user: any = response;
          
          dispatch(login({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phoneNumber: user.phone_number,
            role: user.role
          }));
          
          navigate('/dashboard');
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('userId');
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return (
    <DefaultLayout>
      <div className="relative h-full">
        {isLoading ? <Loader /> : shouldRender && <Outlet />}
      </div>
    </DefaultLayout>
  );
}

export default App;
