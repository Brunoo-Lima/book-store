export type Option = {
  value: string;
  label: string;
};

type FilterProps = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

const Select = ({ value, options, onChange }: FilterProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-2 border-2 border-gray-200 rounded-md outline-none focus:border-emerald-300"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
