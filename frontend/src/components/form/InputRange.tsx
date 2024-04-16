type InputRangeProps = {
  filterPrice: number;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputRange = ({ filterPrice, handlePriceChange }: InputRangeProps) => {
  return (
    <div className="flex items-center gap-1">
      <label htmlFor="price">Preço:</label>
      R$ 10,00
      <input
        type="range"
        name="price"
        min={10}
        max={500}
        value={filterPrice}
        onChange={handlePriceChange}
      />
      R$ 500,00
    </div>
  );
};

export default InputRange;
