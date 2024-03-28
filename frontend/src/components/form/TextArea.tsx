import { forwardRef } from 'react';

type TextAreaProps = {
  placeholder: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder }, ref) => {
    return (
      <div>
        <textarea
          placeholder={placeholder}
          ref={ref}
          className="p-1.5 text-base rounded-md border-2 border-gray-200 outline-none focus:border-emerald-200"
          rows={6}
          cols={50}
        />
      </div>
    );
  },
);

export default TextArea;
