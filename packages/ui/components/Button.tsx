import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded'
  const variantClasses = variant === 'primary' ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'

  return <button className={`${baseClasses} ${variantClasses}`}>{children}</button>
}