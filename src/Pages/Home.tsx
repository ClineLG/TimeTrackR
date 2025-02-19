import axios from "axios";
import { useEffect, useState } from "react";
import { TokenProps } from "../UserTypes";
import { Activity } from "../components/Activity";
import ModalEdit from "../components/ModalEdit";

const Home = ({ checkUser }: TokenProps) => {
  const [activities, setActivities] = useState<
    | {
        name: string;
        _id: string;
        pending:
          | { year: number; week: number; day: number; time: number }
          | undefined;
      }[]
    | null
  >(null);

  const [loading, setLoading] = useState(true);
  const [create, setCreate] = useState(false);
  const [newActivity, setNewActivity] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState({ name: "", id: "" });
  const [user, setUser] = useState({ name: "", quote: "" });
  //USEREDUCER
  // const initialState={activities:[],loading:true,error:"",isLoading:false,create:false,newActivity:''}

  // const reducer = (state,action)=>{
  //   switch (action.type){
  //     case "SET_ACTIVITIES":
  //       return {...state,activities:action.payload};

  //   }
  // }

  const fetchData = async () => {
    if (!checkUser()) {
      console.log("User is null");
      return;
    }
    try {
      const response = await axios.get("http://localhost:3000/activities/all", {
        headers: {
          Authorization: "Bearer " + checkUser(),
        },
      });
      // console.log("Response<<<<", response.data);
      setActivities(response.data.activities);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      setError("une erreur est survenue");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!newActivity) {
      setError("You need to write something");
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:3000/activity/create",
          { name: newActivity },
          {
            headers: {
              Authorization: "Bearer " + checkUser(),
            },
          }
        );
        setNewActivity("");
        setCreate(false);
        setIsLoading(false);
        fetchData();
        console.log(response.data);
      } catch (error) {
        if (error) {
          setError("une erreur est survenue veuillez réessayer");
        }
        setIsLoading(false);
      }
    }
  };

  ///////////////////////////////////////
  const handleDelete = async (id: string) => {
    try {
      console.log("ID", id);
      const response = await axios.post(
        "http://localhost:3000/activity/delete",
        { id: id },
        {
          headers: {
            Authorization: "Bearer " + checkUser(),
          },
        }
      );
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  return loading ? (
    <div>loading</div>
  ) : (
    <section className="relative p-6 space-y- rounded-lg shadow-md">
      <div>
        <p className="text-3xl font-semibold text-gray-900 text-center">
          Hello {user.name} 👋
        </p>
        <p>{user.quote}</p>
        <p></p>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 text-center">
        Mes Activité
      </h1>
      <div
        onClick={() => setCreate(true)}
        className="bg-indigo-500 text-white font-semibold py-2 px-6 rounded-lg inline-block cursor-pointer hover:bg-indigo-600 focus:outline-none  transition duration-300"
      >
        New project
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form
        className={`${!create ? "hidden" : ""} space-y-4`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="project"
          placeholder="New Activity"
          onChange={(event) => setNewActivity(event.target.value)}
          value={newActivity}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button
          disabled={isLoading}
          className="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
        >
          {" "}
          Add{" "}
        </button>
      </form>
      {edit && <ModalEdit setEdit={setEdit} idToEdit={idToEdit} />}

      <ul className="space-y-4">
        {activities?.map((activity) => (
          <Activity
            setEdit={setEdit}
            activity={activity}
            handleDelete={handleDelete}
            key={activity._id}
            setIdToEdit={setIdToEdit}
          /> //comp wt start end delete actual time?
        ))}
      </ul>
    </section>
  );
};
export default Home;
