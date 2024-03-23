import { forwardRef } from 'react';

type InputProps = {
  type: string;
  placeholder: string;
  width?: number;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, width }, ref) => {
    return (
      <div className={`p-1 w-${width}`}>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          className="border-2 border-gray-200 p-2.5 rounded-md text-base focus-visible:border-emerald-300 outline-none"
          style={{ width: `${width}px` }}
        />
      </div>
    );
  },
);

export default Input;
