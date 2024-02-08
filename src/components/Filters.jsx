import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const { meta, params } = useLoaderData();
  return (
    <Form className="bg-base-200 rounded-box px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput type="search" label="Search Product" name="search" size="input-sm" defaultValue={params.search}></FormInput>
      {/* CATEGORIES */}
      <FormSelect label="select category" name="category" list={meta.categories} size="select-sm" defaultValue={params.category} />
      {/* COMPANIES */}
      <FormSelect label="select company" name="company" list={meta.companies} size="select-sm" defaultValue={params.company} />
      {/* ORDER */}
      <FormSelect label="Sort by" name="order" list={["a-z", "z-a", "high", "low"]} size="select-sm" defaultValue={params.order} />
      {/* RANGE */}
      <FormRange label="price range" name="price" size="range-xs" defaulValue={params.price} />
      {/* CHECKBOX */}
      <FormCheckbox label="free shipping" name="shipping" size="checkbox-sm" defaultValue={params.shipping} />
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        Search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
    </Form>
  );
};

export default Filters;
