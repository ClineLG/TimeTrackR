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
    <section>
      <form
        onSubmit={handleSubmit}
        className="bg-green-500 flex flex-col rounded-xl items-center"
      >
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
        <Link to="/password">mot de passe oublié?</Link>
        {error && <p className="bg-red-500">{error}</p>}
        <button disabled={loading ? true : false}> Se connecter</button>
        <Link to="/signup">Pas de compte ? S'inscrire</Link>
      </form>
    </section>
  );
};
export default Login;
