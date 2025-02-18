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

        const response = await axios.post("http://localhost:3000/user/login", {
          password: password,

          email: email,
        });

        login(response.data);

        navigate("/home");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className=" text-center text-2xl font-semibold text-gray-800 mb-6">
        Connexion
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          setError={setError}
          placeholder="Email"
          name="email"
          setState={setEmail}
          state={email}
        />

        <Input
          setError={setError}
          placeholder="Mot de Passe"
          password
          name="password"
          setState={setPassword}
          state={password}
        />
        <div className="flex-col flex justify-center">
          <Link to="/password" className="font-thin text-indigo-600 text-right">
            mot de passe oublié ?
          </Link>
          {error && <p className="bg-red-500">{error}</p>}

          <button
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading ? true : false}
          >
            Se connecter
          </button>
          <Link
            to="/signup"
            className="text-center mt-5 text-indigo-600 underline"
          >
            Pas de compte ? S'inscrire
          </Link>
        </div>
      </form>
    </section>
  );
};
export default Login;
