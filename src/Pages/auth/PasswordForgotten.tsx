import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import { useState } from "react";

const PasswordForgotten = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [data, setData] = useState("");

  const [code, setCode] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
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
          "https://site--timetrackr--phx29rm2mv76.code.run/user/send-email",
          {
            email: email,
          }
        );

        setData(response.data.secretCode);

        setLoading(false);
      } catch (error) {
        console.log(error);
        if (
          axios.isAxiosError(error) &&
          error.response?.data.message === "unknown email"
        ) {
          setError("The entered email address is unknown.");
        } else {
          setError("An error occurred");
        }
        setLoading(false);
      }
    }
  };

  const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (data === code) {
      navigate("/resetPassword", { state: email });
    } else {
      setError("This is not the correct code !");
    }
  };

  return (
    <section className="bg-gray-500 p-10 min-h-screen">
      <div className="mt-20 max-w-2xl mx-auto p-6 bg-gray-200  text-gray-600  rounded-2xl">
        {!data ? (
          <>
            <h1 className="text-4xl font-semibold text-center  text-gray-800 pb-5">
              Forgot password ?
            </h1>
            <p className="text-[14px] text-center m-5 text-gray-600">
              Don't worry, we'll send you a code by email to reset your
              password.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <Input
                label="E-mail address"
                setError={setError}
                placeholder="E-mail"
                name="email"
                setState={setEmail}
                state={email}
              />
              <div className="flex-col flex justify-center">
                {error && <p className="bg-red-500">{error}</p>}
                <button
                  className="w-fit mx-auto px-10 p-3 my-2 bg-gray-800 text-white rounded-md  hover:bg-gray-500 "
                  disabled={loading ? true : false}
                >
                  Envoyer
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-semibold text-center  text-gray-800 pb-5">
              E-mail sent !
            </h1>
            <form onSubmit={handleSubmit2} className="flex flex-col gap-7">
              <p className="text-[14px] text-center  text-gray-600">
                "Enter the code you received by email in the field below."
              </p>
              <Input
                label="Code received"
                setError={setError}
                placeholder="Secret code"
                name="code"
                setState={setCode}
                state={code}
              />
              <div className="flex-col flex justify-center">
                {error && <p className="bg-red-500">{error}</p>}
                <button
                  disabled={loading ? true : false}
                  className="p-3 my-2 w-fit mx-auto px-10  bg-gray-800 text-white rounded-md  hover:bg-gray-500 "
                >
                  Send
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};
export default PasswordForgotten;
