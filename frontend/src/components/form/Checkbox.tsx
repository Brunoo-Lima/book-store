type CheckboxProps = {
  name: string;
};

const Checkbox = ({ name }: CheckboxProps) => {
  return (
    <div className="flex items-center p-2 rounded">
      <input
        id={name}
        type="checkbox"
        value={name}
        className="w-4 h-4 bg-gray-100 border-gray-300 rounded outline-none"
      />
      <label
        htmlFor={name}
        className="w-full ms-2 text-sm font-medium text-gray-900 rounded"
      >
        {name}
      </label>
    </div>
  );
};

export default Checkbox;
