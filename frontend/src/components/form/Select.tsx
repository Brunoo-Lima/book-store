const Select = () => {
  return (
    <select
      name="select"
      id=""
      className="p-2 rounded-md border-2 border-gray-200 focus:border-emerald-200 outline-none"
    >
      <option value="bronze">Bronze</option>
      <option value="silver">Prata</option>
      <option value="gold">Ouro</option>
    </select>
  );
};

export default Select;
