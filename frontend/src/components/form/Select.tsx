export type Option = {
  value: string;
  label: string;
};

type FilterProps = {
  value: string[];
  options: Option[];
  onChange?: (value: string[]) => void;
};

const Select = ({ value, options, onChange, ...rest }: FilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    onChange?.(selectedValue);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      defaultChecked
      {...rest}
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
