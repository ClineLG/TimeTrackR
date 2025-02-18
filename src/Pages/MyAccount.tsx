import { useEffect, useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
type AccountProps = { checkUser: () => string | undefined; logout: () => void };
const MyAccount = (props: AccountProps) => {
  const { checkUser, logout } = props;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/details", {
          headers: {
            Authorization: "Bearer " + checkUser(),
          },
        });
        console.log(response.data);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setLoading(false);
      } catch (error) {
        if (error) {
          console.log(error);
          setError("Une erreur est survenue");
          setLoading(false);
        }
      }
    };
    fetchdata();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password && password !== confirmPassword) {
      setError("Les mots de passes ne sont pas identiques");
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setError("Veuillez entrer une adresse email valide");
    } else {
      try {
        setIsLoading(true);
        const response = await axios.put(
          "http://localhost:3000/user/update",
          {
            password,
            username,
            email,
          },
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        if (response) {
          setIsLoading(false);

          navigate("/home");
        }
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.data.message === "email already used"
        ) {
          setError("Adresse email déjà utilisée");
        } else {
          setError("Une erreur est survenue");
        }
        setIsLoading(false);
      }
    }
  };

  const handleDisco = () => {
    logout();
    navigate("/");
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete("http://localhost:3000/user/delete", {
        headers: {
          Authorization: "Bearer " + checkUser(),
        },
      });
      setIsLoading(false);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      if (error) {
        setError("Une erreur est survenue.");
      }
      setIsLoading(false);
    }
  };

  return loading ? (
    <div>loading</div>
  ) : (
    <div className="mt-20 max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Mes informations
      </h1>

      <form className="space-y-4" onSubmit={(event) => handleSubmit(event)}>
        <Input
          setError={setError}
          placeholder="Email"
          name="email"
          setState={setEmail}
          state={email}
        />
        <Input
          setError={setError}
          placeholder="pseudo"
          name="username"
          setState={setUsername}
          state={username}
        />
        <Input
          setError={setError}
          password
          placeholder="mot de passe"
          name="password"
          setState={setPassword}
          state={password}
        />
        <Input
          password
          setError={setError}
          placeholder="confirmation mdp"
          name="confirmPassword"
          setState={setConfirmPassword}
          state={confirmPassword}
        />
        {error && <p>{error}</p>}
        {isLoading && <p>Loading</p>}
        <div className="flex justify-center">
          <button
            disabled={isLoading ? true : false}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Enregistrer mes informations
          </button>
        </div>
      </form>
      <div className="mt-6 flex justify-between">
        <button
          className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 focus:outline-none"
          onClick={handleDisco}
        >
          Me déconnecter
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-700 focus:outline-none"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
};
export default MyAccount;
