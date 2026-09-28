import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-[#3D1F2D] tracking-wide ml-1">
          {label}
        </label>
      )}
      <input 
        className={`w-full bg-[#FDFBFC] border border-[#C4A8B5] text-[#3D1F2D] rounded-full px-5 py-3 focus:outline-none focus:border-[#FF4D8D] focus:ring-4 focus:ring-[#FF4D8D]/10 transition-all ${className}`}
        {...props}
      />
    </div>
  );
};
