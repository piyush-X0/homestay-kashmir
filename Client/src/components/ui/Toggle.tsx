import React from 'react';

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  children: React.ReactNode;
}

export const Toggle: React.FC<ToggleProps> = ({
  pressed,
  onPressedChange,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={`${
        pressed
          ? 'bg-indigo-600 text-white'
          : 'bg-white text-gray-900 hover:bg-gray-50'
      } px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};