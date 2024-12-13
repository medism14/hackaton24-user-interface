import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Input } from '../../components';
import { useForm } from 'react-hook-form';
import { login } from '../../redux/features/authSlice';
import expirateTimer from '../../utils/expirationResponseMessage';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  role: string;
  id: number;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', data.email);
      formData.append('password', data.password);

      const response = await apiClient.post('/users/login/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const userData: any = response;

      if (userData.role === 'ADMIN') {
        // Store user data in localStorage
        localStorage.setItem('userId', userData.id.toString());
        localStorage.setItem('accessToken', userData.access_token);

        console.log(userData.id);
        
        // Get complete user data
        const userDetailsResponse = await apiClient.get(`/users/${userData.id}`);
        const userDetails: any = userDetailsResponse;

        // Dispatch complete user data to Redux store
        dispatch(login({
          id: userData.id,
          firstName: userDetails.first_name || '',
          lastName: userDetails.last_name || '',
          email: userDetails.email || data.email,
          phoneNumber: userDetails.phone_number || '',
          role: userData.role
        }));

        navigation('/dashboard');
      } else {
        setErrorMessage('Accès non autorisé');
        expirateTimer(setErrorMessage);
      }
    } catch (error) {
      const message = 'Identifiants incorrects';
      setErrorMessage(message);
      expirateTimer(setErrorMessage);
    }
  };

  return (
    <div className="flex h-full items-center justify-center mx-auto flex-col pb-[50px] md:pb-[150px] lg:pb-[200px] w-[80%] md:w-[50%] lg:w-[30%]">
      <img
        src="/logo-no-background.png"
        alt=""
        className="w-[150px] h-auto mb-[35px]"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          name="email"
          type="text"
          placeholder="Adresse e-mail"
          rounded="20"
          error={errors.email?.message}
          register={register('email', {
            required: "L'email est requis",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Adresse email invalide',
            },
          })}
        />

        <Input
          name="password"
          placeholder="Mot de passe"
          marginTop="20"
          rounded="20"
          type="password"
          error={errors.password?.message}
          register={register('password', {
            required: 'Le mot de passe est requis',
            minLength: {
              value: 6,
              message: 'Le mot de passe doit contenir au moins 6 caractères',
            },
          })}
        />

        <button
          type="submit"
          className="
          w-full
          mt-[35px]
          px-6
          py-3
          rounded-[20px]
          bg-primary
          text-white
          font-medium
          transition-all
          duration-200
          hover:bg-opacity-90
          focus:ring-2
          focus:ring-primary
          focus:ring-opacity-50
          active:transform
          active:scale-[0.98]
          disabled:opacity-70
          disabled:cursor-not-allowed
          shadow-lg
          hover:shadow-primary/50
        "
        >
          Se connecter
        </button>
      </form>
      {errorMessage && (
        <ErrorMessage marginTop="15">{errorMessage}</ErrorMessage>
      )}
    </div>
  );
};

export default Login;
