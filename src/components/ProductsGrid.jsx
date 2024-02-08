import { Link, useLoaderData } from "react-router-dom";

const ProductsGrid = () => {
  const { products } = useLoaderData();
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        return (
          <Link key={product.id} to={`/products/${product.id}`} className=" bg-base-100 rounded-box shadow-xl hover:scale-105 transition duration-200 ">
            <figure className="px-4 pt-4 ">
              <img src={image} alt={title} className="rounded-xl object-cover h-64 md:h-48 w-full" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="capitalize font-semibold text-lg"> {title} </h2>
              <span className="text-secondary"> ${(price / 100).toFixed(2)} </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
