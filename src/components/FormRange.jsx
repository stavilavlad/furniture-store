import { useState } from "react";

const FormRange = ({ label, name, size, defaultValue }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(defaultValue || maxPrice);
  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>${selectedPrice / 100}</span>
      </label>
      <input type="range" name={name} id={name} min={0} max={maxPrice} value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} step={step} className={`range range-primary ${size}`} />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-semibold text-md">0</span>
        <span className="font-semibold text-md">Max : ${(maxPrice / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default FormRange;
