import React, { forwardRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  marginTop?: string;
  marginBottom?: string;
  rounded?: string;
  error?: string;
  register?: any;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    name,
    placeholder,
    marginTop,
    marginBottom,
    rounded = 10,
    error,
    register,
    type = 'text',
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full flex flex-col gap-2">
        <div
          className="relative"
          style={{
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
          }}
        >
          <input
            {...register}
            name={name}
            type={
              type === 'password' ? (showPassword ? 'text' : 'password') : type
            }
            style={{
              borderRadius: `${rounded}px`,
            }}
            className={`
              w-full
              px-4 
              py-3
              bg-white
              dark:bg-form-input
              border
              border-graydark 
              dark:border-form-strokedark
              text-black
              dark:text-white
              placeholder:text-gray-500
              dark:placeholder:text-bodydark
              outline-none
              transition-all
              duration-200
              hover:border-primary
              hover:bg-gray-100
              dark:hover:bg-gray-800
              focus:border-primary
              focus:shadow-[0_0_0_3px_rgba(60,80,224,0.15)]
              ${
                error
                  ? 'border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(211,64,83,0.15)]'
                  : ''
              }
            `}
            placeholder={placeholder}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute w-[50px] right-0 top-0 bottom-0 flex items-center justify-center text-gray-500 hover:text-primary focus:outline-none"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="w-[23px] h-[23px]"
              />
            </button>
          )}
        </div>
        {error && <span className="text-sm text-danger">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
