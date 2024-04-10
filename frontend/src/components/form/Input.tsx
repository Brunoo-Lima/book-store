import { ChangeEvent, forwardRef } from 'react';

type InputProps = {
  type: string;
  placeholder: string;
  name?: string;
  width?: number;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, placeholder, width, onChange, value, name, required, ...rest },
    ref,
  ) => {
    return (
      <div className={`p-0.5 w-${width}`}>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          {...rest}
          ref={ref}
          value={value}
          onChange={onChange}
          required={required}
          className="border-2 border-gray-200 p-2.5 rounded-md text-base focus-visible:border-emerald-300 outline-none"
          style={{ width: `${width}px` }}
        />
      </div>
    );
  },
);

export default Input;
