import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password || !confirmPassword || !username || !email) {
      setError("Veuillez remplir tous les champs");
    } else if (password !== confirmPassword) {
      setError("Les mots de passe ne sont pas identiques");
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setError("Veuillez entrer une adresse email valide");
    } else {
      try {
        setLoading(true);

        const response = await axios.post("http://localhost:3000/user/signup", {
          password: password,
          username: username,
          email: email,
        });

        // setData(response.data)

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
          placeholder="Pseudo"
          name="username"
          setState={setUsername}
          state={username}
        />
        <Input
          setError={setError}
          placeholder="Mot de Passe"
          password
          name="password"
          setState={setPassword}
          state={password}
        />
        <Input
          setError={setError}
          password
          placeholder="Confirmation du mot de passe"
          name="confirmPassword"
          setState={setConfirmPassword}
          state={confirmPassword}
        />
        {error && <p className="bg-red-500">{error}</p>}
        <button disabled={loading ? true : false}> S'enregistrer</button>
        <Link to="/login">Déjà inscrit ? Se connecter</Link>
      </form>
    </section>
  );
};
export default Signup;
