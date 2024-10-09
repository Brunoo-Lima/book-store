import { SearchIcon } from 'lucide-react';
import { ChangeEvent } from 'react';

interface IInputSearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function InputSearch({
  value,
  onChange,
  placeholder,
  ...rest
}: IInputSearchProps) {
  return (
    <div className="relative">
      <div className="absolute top-0.5 left-0.5 rounded-full bg-blue-900 size-8 flex items-center justify-center">
        <SearchIcon size={18} color="#fff" />
      </div>

      <input
        type="text"
        placeholder={placeholder}
        className="ps-10 pe-1 border-[1px] border-transparent rounded-3xl h-9 text-sm text-black outline-none focus-visible:border-blue-500"
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
