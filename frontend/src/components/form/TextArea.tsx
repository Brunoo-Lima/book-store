import { forwardRef } from 'react';

type TextAreaProps = {
  placeholder: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder }, ref) => {
    return (
      <div>
        <textarea placeholder={placeholder} ref={ref} />
      </div>
    );
  },
);

export default TextArea;
