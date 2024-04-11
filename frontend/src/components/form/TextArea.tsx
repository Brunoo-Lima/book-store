import { ChangeEvent, forwardRef } from 'react';

type TextAreaProps = {
  placeholder: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, value, onChange, ...rest }, ref) => {
    return (
      <div>
        <textarea
          placeholder={placeholder}
          ref={ref}
          className="p-1.5 text-base rounded-md border-2 border-gray-200 outline-none focus:border-emerald-200"
          rows={6}
          cols={50}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </div>
    );
  },
);

export default TextArea;
