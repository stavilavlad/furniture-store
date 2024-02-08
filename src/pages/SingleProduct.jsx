import { Link, useLoaderData } from "react-router-dom";
import { customFetch, generateAmountOptions } from "../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const singleProductQuery = (id) => {
  return { queryKey: ["singleProduct", id], queryFn: () => customFetch(`/products/${id}`) };
};

export const loader = (queryClient) => async (req) => {
  const response = await queryClient.ensureQueryData(singleProductQuery(req.params.id));
  const product = response.data.data;
  return product;
};

const SingleProduct = () => {
  const product = useLoaderData();
  const { title, company, description, image, price, colors } = product.attributes;
  const [amount, setAmount] = useState(1);
  const [productColor, setProductColor] = useState(colors[0]);

  function handleAmount(e) {
    setAmount(parseInt(e.target.value));
  }

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className="text-md breadcrumbs font-semibold">
        <ul>
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/products"> Products</Link>
          </li>
        </ul>
      </div>

      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img src={image} alt={title} className="rounded-xl h-96 w-96 object-cover  lg:w-full" />
        <div>
          <h1 className="capitalize text-3xl font-semibold pb-2">{title}</h1>
          <h4 className=" text-neutral-content font-semibold pb-2 text-xl">{company}</h4>
          <p className="mt-3 text-xl">${price / 100}</p>
          <p className="mt-6 leading-8">{description}</p>
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider">Colors</h4>
            <div>
              {colors.map((color) => {
                return <button key={color} type="button" className={`badge w-6 h-6 mr-2 ${color == productColor && "border-2 border-secondary"}`} style={{ backgroundColor: color }} onClick={() => setProductColor(color)}></button>;
              })}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="amount">
                <h4 className="text-md font-medium tracking-wider capitalize">Amount</h4>
              </label>
              <select id="amount" className="select select-secondary select-bordered select-md" value={amount} onChange={handleAmount}>
                {generateAmountOptions(10)}
              </select>
            </div>
            <div className="mt-10">
              <button className="btn btn-secondary btn-md" onClick={addToCart}>
                {" "}
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
