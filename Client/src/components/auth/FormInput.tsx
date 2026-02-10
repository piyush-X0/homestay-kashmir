import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  error?: string;
  label: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  icon: Icon,
  error,
  label,
  className = '',
  ...props
}, ref) => {
  return (
    <div>
      <label htmlFor={props.id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          {...props}
          ref={ref}
          className={`appearance-none relative block w-full px-12 py-3 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${className}`}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;