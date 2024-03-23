const Filter = () => {
  return (
    <div className="flex items-center gap-2">
      <h2>Status:</h2>

      <select
        name=""
        id=""
        className="px-2 border-2 border-gray-200 rounded-md outline-none focus:border-emerald-300"
      >
        <option value="bronze">Bronze</option>
        <option value="silver">Prata</option>
        <option value="gold">Ouro</option>
      </select>

      <div className="flex items-center gap-1">
        <p>Ordenar:</p>
        <select
          name=""
          id=""
          className="px-2 border-2 border-gray-200 rounded-md outline-none focus:border-emerald-300"
        >
          <option value="Asc">Asc</option>
          <option value="Desc">Desc</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
