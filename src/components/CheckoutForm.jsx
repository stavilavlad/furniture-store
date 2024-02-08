import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } = store.getState().cartState;

    const info = {
      address,
      cartItems,
      chargeTotal: orderTotal,
      name,
      numItemsInCart,
      orderTotal: `$${(orderTotal / 100).toFixed(2)}`,
    };

    try {
      const response = await customFetch.post(
        "/orders",
        {
          data: info,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      queryClient.removeQueries(["orders"]);

      store.dispatch(clearCart());
      toast.success("Order placed successfully!");
      return redirect("/orders");
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message || "Error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return redirect("/login");
      }
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST">
      <h3 className="text-xl font-semibold">Shipping Information</h3>
      <div className="mb-8 mt-6 flex flex-col gap-4">
        <FormInput label="First Name" type="text" name="name" />
        <FormInput label="Address" type="text" name="address" />
      </div>
      <SubmitBtn text="Place your order" />
    </Form>
  );
};

export default CheckoutForm;
