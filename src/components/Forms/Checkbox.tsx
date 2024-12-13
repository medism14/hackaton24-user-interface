import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  id: string;
  marginTop?: string;
  marginBottom?: string;
  error?: string;
  register?: any;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { name, label, id, marginTop, marginBottom, error, register, ...props },
    ref,
  ) => {
    return (
      <div className="w-full flex flex-col gap-2">
        <div
          className="w-full flex items-center gap-2"
          style={{
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
          }}
        >
          <input
            {...register}
            type="checkbox"
            name={name}
            id={id}
            ref={ref}
            className={`
              w-5 
              h-5
              border
              border-graydark 
              dark:border-form-strokedark
              text-primary
              bg-white
              dark:bg-form-input
              rounded
              transition-all
              duration-200
              hover:border-primary
              focus:border-primary
              focus:ring-2
              focus:ring-primary
              focus:ring-opacity-15
              dark:focus:ring-opacity-30
              ${
                error
                  ? 'border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(211,64,83,0.15)]'
                  : ''
              }
            `}
            {...props}
          />
          <label
            htmlFor={id}
            className="text-black dark:text-white cursor-pointer"
          >
            {label}
          </label>
        </div>
        {error && <span className="text-sm text-danger">{error}</span>}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
