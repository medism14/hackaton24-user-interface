import React, { forwardRef } from 'react';

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
              outline-none
              transition-all
              duration-200
              hover:border-primary
              dark:hover:bg-gray-800
              focus:border-primary
              focus:shadow-[0_0_0_3px_rgba(60,80,224,0.15)]
              ${error
                ? 'border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(211,64,83,0.15)]'
                : ''
              }
            `}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <span className="text-sm text-danger">{error}</span>}
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;