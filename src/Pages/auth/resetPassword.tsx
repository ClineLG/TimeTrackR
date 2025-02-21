import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import { useState } from "react";
import { AuthProps } from "../../UserTypes";

const ResetPassword = ({ login }: AuthProps) => {
  const location = useLocation();
  const email: string = location.state;
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      setError("The passwords do not match.");
    } else {
      try {
        setLoading(true);

        const response = await axios.put(
          "http://localhost:3000/user/reset-password",
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
        setLoading(false);
        if (error) {
          setError("An error occurred.");
        }
      }
    }
  };

  return (
    <section className="bg-gray-500 p-10 min-h-screen">
      <div className="mt-20 max-w-2xl mx-auto p-6 bg-gray-200  text-gray-600  rounded-2xl">
        <h1 className="text-4xl font-semibold text-center  text-gray-800 pb-5">
          Password Reset
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <Input
            label="Password"
            setError={setError}
            placeholder="*****"
            name="password"
            password
            setState={setPassword}
            state={password}
          />
          <Input
            setError={setError}
            label="Confirm Password"
            placeholder="*****"
            password
            name="password"
            setState={setConfirmPassword}
            state={confirmPassword}
          />
          <div className="flex-col flex justify-center">
            {error && <p className="bg-red-500">{error}</p>}
            <button
              className="p-3 my-2 w-fit mx-auto px-10  bg-gray-800 text-white rounded-md  hover:bg-gray-500 "
              disabled={loading ? true : false}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default ResetPassword;
