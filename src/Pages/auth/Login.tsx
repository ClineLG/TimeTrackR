import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import { useState } from "react";
import { AuthProps } from "../../UserTypes";

const Login = ({ login }: AuthProps) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password || !email) {
      setError("Please fill in all fields.");
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setError("Please enter a valid email address.");
    } else {
      try {
        setLoading(true);

        const response = await axios.post(
          "https://site--timetrackr--phx29rm2mv76.code.run/user/login",
          {
            password: password,

            email: email,
          }
        );

        login(response.data);

        navigate("/home");
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (
          axios.isAxiosError(error) &&
          error.response?.data.message === "Email address unknown"
        ) {
          setError("The entered email address is unknown.");
        } else if (
          axios.isAxiosError(error) &&
          error.response?.data.message === "Wrong password"
        ) {
          setError("Incorrect password");
        } else {
          setError("An error occurred");
        }
        setLoading(false);
      }
    }
  };

  return (
    <section className="bg-gray-500 p-10 min-h-screen">
      <div className="mt-20 max-w-2xl mx-auto p-6 bg-gray-200  text-gray-600  rounded-2xl">
        <h1 className="text-4xl font-semibold text-center  text-gray-800 pb-5">
          Sign in
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <Input
            label="E-mail address"
            setError={setError}
            placeholder="E-mail"
            name="email"
            setState={setEmail}
            state={email}
          />

          <Input
            label="Password"
            setError={setError}
            placeholder="*****"
            password
            name="password"
            setState={setPassword}
            state={password}
          />
          <div className="flex-col flex justify-center">
            <Link to="/password" className="font-thin text-gray-600 text-right">
              Forgot password ?
            </Link>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              className="p-3 my-2 w-fit mx-auto px-10  bg-gray-800 text-white rounded-md  hover:bg-gray-500 "
              disabled={loading ? true : false}
            >
              Submit
            </button>
            <Link
              to="/signup"
              className="text-center mt-5 text-gray-600 underline"
            >
              No account ? Sign up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Login;
