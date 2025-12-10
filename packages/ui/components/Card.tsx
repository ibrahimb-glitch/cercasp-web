import React from 'react'

interface CardProps {
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="border rounded p-4 shadow">{children}</div>
}