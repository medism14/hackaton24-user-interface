import React from 'react';

interface ErrorMessageProps {
  children: React.ReactNode;
  marginTop?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, marginTop }) => {
  return (
    <p
      className="text-danger text-center"
      style={{ marginTop: `${marginTop}px` }}
    >
      {children}
    </p>
  );
};

export default ErrorMessage;
