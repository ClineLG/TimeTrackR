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
    <section>
      {!data ? (
        <form
          onSubmit={handleSubmit}
          className="bg-green-500 flex flex-col rounded-xl items-center"
        >
          <h1>Mot de passe oublié?</h1>
          <p>Pas de panique nous allons t'envoyer un code pour </p>
          <Input
            setError={setError}
            placeholder="Email"
            name="email"
            setState={setEmail}
            state={email}
          />

          {error && <p className="bg-red-500">{error}</p>}
          <button disabled={loading ? true : false}> Envoyer </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit2}
          className="bg-green-500 flex flex-col rounded-xl items-center"
        >
          <h1>Mot de passe oublié?</h1>
          <p>Pas de panique nous allons t'envoyer un lien pour régler ça !</p>
          <Input
            setError={setError}
            placeholder="Code reçu"
            name="code"
            setState={setCode}
            state={code}
          />

          {error && <p className="bg-red-500">{error}</p>}
          <button disabled={loading ? true : false}> Envoyer </button>
        </form>
      )}
    </section>
  );
};
export default PasswordForgotten;
