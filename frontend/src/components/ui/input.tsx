/* eslint-disable react/display-name */
import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  label: string;
  error?: FieldError | undefined;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ type, placeholder, label, error, ...rest }, ref) => {
    return (
      <div className="w-full">
        <label
          htmlFor={label}
          className="block mb-2 text-sm font-medium text-white"
        >
          {label}
        </label>
        <input
          type={type}
          id={label}
          name={label}
          className="border border-gray-600 text-white text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 bg-gray-700 outline-none"
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />

        {error && error.message && (
          <span className="text-sm text-red-600">{error.message}</span>
        )}
      </div>
    );
  }
);

export default Input;
