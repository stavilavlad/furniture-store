import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log(request);
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const response = await customFetch.post("/auth/local/register", data);
    toast.success("User registered successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage = error?.response?.data?.error?.message || "please double check credentials";
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form method="POST" className="card w-96 p-8 bg-base-300 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="Username" name="username" />
        <FormInput type="email" label="Email" name="email" />
        <FormInput type="password" label="Password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="Register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link to="/login" className="ml-2 link link-hover link-primary capitalize">
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
