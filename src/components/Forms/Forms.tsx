import React from 'react'

interface FormsProps {
    children: React.ReactNode;
}

const Forms: React.FC<FormsProps> = ({ children }) => {
  return (
    <div className='mx-auto bg-red-200 p-[30px]'>
        {children}
    </div>
  )
}

export default Forms