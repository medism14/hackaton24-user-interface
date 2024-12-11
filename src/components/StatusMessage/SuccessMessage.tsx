import React from 'react';

interface SuccessMessageProps {
  children: React.ReactNode;
  marginTop?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  children,
  marginTop,
}) => {
  return (
    <p
      className="text-success text-center"
      style={{ marginTop: `${marginTop}px` }}
    >
      {children}
    </p>
  );
};

export default SuccessMessage;
