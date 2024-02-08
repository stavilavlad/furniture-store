import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { ComplexPagination, OrdersList, SectionTitle } from "../components";
import { customFetch } from "../utils";

const ordersQuery = (params, user) => {
  return {
    queryKey: ["orders", user.username, params.page ? parseInt(params.page) : 1],
    queryFn: () =>
      customFetch("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warning("You must be logged in!");
      return redirect("/login");
    }

    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

    try {
      const response = await queryClient.ensureQueryData(ordersQuery(params, user));

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message || "Error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return redirect("/login");
      }
      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="No orders placed" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPagination />
    </>
  );
};

export default Orders;
