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
        Réinitialisation du mot de passe
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex-col flex justify-center">
          {error && <p className="bg-red-500">{error}</p>}
          <button
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading ? true : false}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </section>
  );
};
export default ResetPassword;
