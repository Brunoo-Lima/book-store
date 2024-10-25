/* eslint-disable react/display-name */
import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError | undefined;
}

const Radio = forwardRef<HTMLInputElement, IRadioProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className="flex items-center gap-2 mt-2">
        <input
          type="radio"
          id={label}
          name={label}
          className="size-4 text-gray-700 ring-offset-gray-800 bg-gray-700 border-gray-600"
          ref={ref}
          {...rest}
        />

        <label htmlFor={label} className="block text-sm font-medium text-white">
          {label}
        </label>

        {error && <span className="text-sm text-red-600">{error.message}</span>}
      </div>
    );
  }
);

export default Radio;
