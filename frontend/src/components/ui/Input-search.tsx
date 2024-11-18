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
    <div className="relative cursor-pointer">
      <div
        className="absolute top-0
      bottom-0 left-0 bg-white size-9 flex items-center justify-center border-r-[1px] border-gray-300 rounded-l-md"
      >
        <SearchIcon size={18} color="#3b82f6" />
      </div>

      <input
        type="text"
        placeholder={placeholder}
        className="ps-10 pe-1 border-[1px] border-transparent rounded-md h-9 text-sm text-black outline-none focus-visible:border-blue-500"
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
