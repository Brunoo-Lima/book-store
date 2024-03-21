import { forwardRef } from 'react';

type InputProps = {
  type: string;
  placeholder: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder }, ref) => {
    return (
      <div>
        <input type={type} placeholder={placeholder} ref={ref} className="" />
      </div>
    );
  },
);

export default Input;
