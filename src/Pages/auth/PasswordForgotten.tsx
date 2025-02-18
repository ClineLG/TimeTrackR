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
      setError("Veuillez remplir tous les champs");
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setError("Veuillez entrer une adresse email valide");
    } else {
      try {
        setLoading(true);

        const response = await axios.post(
          "http://localhost:3000/user/send-email",
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
          setError("L'adresse email saisie est inconnue ");
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
      setError("Ce n'est pas le bon code !");
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {!data ? (
        <>
          <h1 className=" text-center text-2xl font-semibold text-gray-800 mb-6">
            Mot de Passe oublié ?
          </h1>
          <p className="text-[14px] text-center m-5 text-gray-600">
            Pas de panique nous allons t'envoyer un code pour réinitialiser ton
            mot de passe.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              setError={setError}
              placeholder="Email"
              name="email"
              setState={setEmail}
              state={email}
            />
            <div className="flex-col flex justify-center">
              {error && <p className="bg-red-500">{error}</p>}
              <button
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading ? true : false}
              >
                Envoyer
              </button>
            </div>
          </form>
        </>
      ) : (
        <form onSubmit={handleSubmit2} className="space-y-4">
          <h1 className=" text-center text-2xl font-semibold text-gray-800 mb-6">
            E-mail envoyé !{" "}
          </h1>{" "}
          <p className="text-[14px] text-center m-5 text-gray-600">
            Inscrit le code que tu as recus par email dans le champs ci-dessous
          </p>
          <Input
            setError={setError}
            placeholder="Code reçu"
            name="code"
            setState={setCode}
            state={code}
          />
          <div className="flex-col flex justify-center">
            {error && <p className="bg-red-500">{error}</p>}
            <button
              disabled={loading ? true : false}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Envoyer
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
export default PasswordForgotten;
