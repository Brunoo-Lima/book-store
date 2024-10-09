/* eslint-disable react/display-name */
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  label: string;
  error?: FieldError | undefined;
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ placeholder, label, error, ...rest }, ref) => {
    return (
      <div>
        <label
          htmlFor={label}
          className="block mb-2 text-sm font-medium text-white"
        >
          {label}
        </label>
        <textarea
          id={label}
          rows={4}
          {...rest}
          ref={ref}
          className="border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 outline-none"
          placeholder={placeholder}
        />

        {error && <span className="text-sm text-red-600">{error.message}</span>}
      </div>
    );
  }
);

export default Textarea;
