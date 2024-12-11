import { Outlet, useNavigate } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import { usePageLoader } from './hooks/usePageLoader';
import Loader from './common/Loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/features/authSlice';

function App() {
  const { isLoading, shouldRender } = usePageLoader();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = {
      id: 1,
      firstName: 'Kadidja',
      lastName: 'Abdo',
      email: 'kadidja@gmail.com',
      phoneNumber: '0780853613',
      role: 'RH',
    };

    dispatch(login(authUser));
    navigate('/dashboard');
  }, []);

  return (
    <DefaultLayout>
      <div className="relative h-full">
        {isLoading ? <Loader /> : shouldRender && <Outlet />}
      </div>
    </DefaultLayout>
  );
}

export default App;
