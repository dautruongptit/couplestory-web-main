import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const base = "inline-flex items-center justify-center font-medium transition-all rounded-full outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[#FF4D8D] text-white hover:bg-[#E63E7B] shadow-sm focus:ring-[#FF4D8D]",
    secondary: "bg-[#FDFBFC] border-[1.5px] border-[#FFB3CE] text-[#3D1F2D] hover:bg-[#FFF5F9] focus:ring-[#FFB3CE]",
    outline: "border-2 border-[#FF4D8D] text-[#FF4D8D] hover:bg-[#FFF5F9] focus:ring-[#FF4D8D]",
    ghost: "bg-transparent text-[#7A5068] hover:bg-[#FFE4EF] hover:text-[#FF4D8D] focus:ring-[#FFE4EF]"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
