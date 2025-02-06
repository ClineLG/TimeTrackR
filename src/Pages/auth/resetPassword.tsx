import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import { useState } from "react";

const ResetPassword = () => {
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
      setError("Veuillez remplir tous les champs");
    } else if (password !== confirmPassword) {
      setError("Les mots de passe ne sont pas identiques");
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
          placeholder="Mot de Passe"
          name="password"
          password
          setState={setPassword}
          state={password}
        />

        <Input
          setError={setError}
          placeholder="Confirmation du Mot de Passe"
          password
          name="password"
          setState={setConfirmPassword}
          state={confirmPassword}
        />

        {error && <p className="bg-red-500">{error}</p>}
        <button disabled={loading ? true : false}>Enregistrer</button>
      </form>
    </section>
  );
};
export default ResetPassword;
