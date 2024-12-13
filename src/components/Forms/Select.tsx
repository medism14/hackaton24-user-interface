import React, { forwardRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  marginTop?: string;
  marginBottom?: string;
  rounded?: string;
  error?: string;
  register?: any;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    name,
    options,
    marginTop,
    placeholder,
    marginBottom,
    rounded = 10,
    error,
    register,
  }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full flex flex-col gap-2">
        <div
          className="relative"
          style={{
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
          }}
        >
          <select
            {...register}
            name={name}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            defaultValue=""
            style={{
              borderRadius: `${rounded}px`,
              appearance: 'none',
            }}
            className={`
              w-full
              px-4 
              py-3.5
              bg-white
              dark:bg-form-input
              border-2
              border-gray-200
              dark:border-form-strokedark
              text-black
              dark:text-white
              outline-none
              transition-all
              duration-200
              cursor-pointer
              hover:border-primary/70
              hover:bg-gray-50
              dark:hover:bg-gray-800
              focus:border-primary
              focus:shadow-[0_0_0_3px_rgba(60,80,224,0.15)]
              ${error
                ? 'border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(211,64,83,0.15)]'
                : ''
              }
              ${isFocused ? 'ring-2 ring-primary/20' : ''}
            `}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                className="py-2 hover:bg-primary/10"
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 transition-transform duration-200">
            <FontAwesomeIcon 
              icon={faChevronDown}
              className={`w-4 h-4 transition-transform duration-200 ${isFocused ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
        {error && (
          <span className="text-sm text-danger font-medium ml-1">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;