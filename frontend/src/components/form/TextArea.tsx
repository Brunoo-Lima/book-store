import { forwardRef } from 'react';

type TextareaProps = {
  placeholder: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ placeholder }, ref) => {
    return (
      <div>
        <textarea placeholder={placeholder} ref={ref} />
      </div>
    );
  },
);

export default Textarea;
