import { useSelector } from "react-redux";

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector((state) => state.cartState);
  return (
    <div className=" bg-base-200 p-4 rounded-box">
      <div className=" text-sm border-b-2  border-base-300 flex justify-between p-2">
        <p>Subtotal</p>
        <p className="font-medium">${(cartTotal / 100).toFixed(2)}</p>
      </div>
      <div className=" text-sm border-b-2  border-base-300 flex justify-between p-2">
        <p>Shipping</p>
        <p className="font-medium">${(shipping / 100).toFixed(2)}</p>
      </div>
      <div className="text-sm border-b-2  border-base-300 flex justify-between p-2">
        <p>Tax</p>
        <p className="font-medium">${(tax / 100).toFixed(2)}</p>
      </div>
      <div className="flex justify-between font-bold px-2 py-6">
        <p>Order Total</p>
        <p>${(orderTotal / 100).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartTotals;
