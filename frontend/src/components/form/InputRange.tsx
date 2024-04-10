type InputRangeProps = {
  price: number;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputRange = ({ price, handlePriceChange }: InputRangeProps) => {
  return (
    <div className="flex items-center gap-1">
      <label htmlFor="price">Preço:</label>
      R$ 10,00
      <input
        type="range"
        name="price"
        min={10}
        max={500}
        value={price}
        onChange={handlePriceChange}
      />
      R$ 500,00
    </div>
  );
};

export default InputRange;
