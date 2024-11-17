/* eslint-disable react/display-name */
import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError | undefined;
  name?: string;
}

const Radio = forwardRef<HTMLInputElement, IRadioProps>(
  ({ label, error, name, ...rest }, ref) => {
    return (
      <div className="flex items-center gap-2 mt-2">
        <input
          type="radio"
          id={label}
          name={name}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          ref={ref}
          {...rest}
        />

        <label
          htmlFor={label}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>

        {error && <span className="text-sm text-red-600">{error.message}</span>}
      </div>
    );
  }
);

export default Radio;
