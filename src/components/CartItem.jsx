import { generateAmountOptions } from "../utils";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const removeItemFromCart = () => {
    dispatch(removeItem({ cartID }));
  };

  const handleAmount = (e) => {
    dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
  };
  const { cartID, title, price, image, amount, company, productColor } = cartItem;
  return (
    <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0 ">
      <img src={image} alt={title} className="h-48 w-full rounded-box sm:h-40 sm:w-40 object-cover" />
      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium text-lg"> {title} </h3>
        <h4 className="capitalize mt-2  text-neutral-content"> {company} </h4>
        {/* color */}
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color :<span className="badge badge-sm" style={{ backgroundColor: productColor }}></span>
        </p>
      </div>
      <div className="sm:ml-12">
        {/* amount */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select name="amount" id="amount " className="mt-2 select select-base select-bordered select-xs w-14" value={amount} onChange={handleAmount}>
            {generateAmountOptions(amount + 10)}
          </select>
        </div>
        {/* remove */}
        <button className="mt-2 link link-primary link-hover text-sm" onClick={removeItemFromCart}>
          Remove
        </button>
      </div>
      {/* price */}
      <p className="font-medium sm:ml-auto"> ${(price / 100).toFixed(2)} </p>
    </article>
  );
};

export default CartItem;
