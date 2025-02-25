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
  const [data, setData] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://site--timetrackr--phx29rm2mv76.code.run/user/details",
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        // setEmail(response.data.email);
        // setUsername(response.data.username);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        if (error) {
          if (error) {
            setError("An error occurred.");
          }

          setLoading(false);
        }
      }
    };
    fetchdata();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username && !email && !password) {
      setError("Please fill in a field to update your information.");
    } else if (password && password !== confirmPassword) {
      setError("The passwords do not match.");
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setError("Please enter a valid email address.");
    } else {
      try {
        setIsLoading(true);
        const response = await axios.put(
          "https://site--timetrackr--phx29rm2mv76.code.run/user/update",
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
          setError("E-mail address already in use.");
        } else {
          setError("An error occurred.");
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
      const response = await axios.delete(
        "https://site--timetrackr--phx29rm2mv76.code.run/user/delete",
        {
          headers: {
            Authorization: "Bearer " + checkUser(),
          },
        }
      );
      setIsLoading(false);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      if (error) {
        setError("An error occurred.");
      }
      setIsLoading(false);
    }
  };

  return loading ? (
    <div>loading</div>
  ) : (
    <section className="bg-gray-500 p-10 min-h-screen ">
      <div className="mt-20 max-w-2xl mx-auto p-6 bg-gray-200  text-gray-600  rounded-2xl">
        <h1 className="text-4xl font-semibold text-center pb-5">
          My informations
        </h1>

        <form
          className="flex flex-col gap-7"
          onSubmit={(event) => handleSubmit(event)}
        >
          <Input
            setError={setError}
            placeholder={data ? data.email : ""}
            label="E-mail address"
            name="email"
            setState={setEmail}
            state={email}
          />
          <Input
            setError={setError}
            placeholder={data ? data.username : ""}
            name="username"
            label="Username"
            setState={setUsername}
            state={username}
          />
          <Input
            setError={setError}
            password
            label="Password"
            placeholder="*****"
            name="password"
            setState={setPassword}
            state={password}
          />
          <Input
            password
            setError={setError}
            label="Confirm Password"
            placeholder="*****"
            name="confirmPassword"
            setState={setConfirmPassword}
            state={confirmPassword}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          {isLoading && <p>Loading</p>}
          <div className="flex justify-center">
            <button
              disabled={isLoading ? true : false}
              className="p-3 my-2 w-fit mx-auto px-10  bg-gray-800 text-white rounded-md  hover:bg-gray-500 "
            >
              Update Information
            </button>
          </div>
        </form>
        <div className="mt-6 flex justify-between">
          <button
            className="px-4 py-2 text-sm text-gray-600 hover:text-red-600 focus:outline-none"
            onClick={handleDisco}
          >
            Sign out
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 focus:outline-none"
          >
            Delete my account
          </button>
        </div>
      </div>
    </section>
  );
};
export default MyAccount;
