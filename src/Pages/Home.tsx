import axios from "axios";
import { useEffect, useState } from "react";
import { TokenProps } from "../UserTypes";
import { Activity } from "../components/Activity";
import ModalEdit from "../components/ModalEdit";
import { MdAddCircleOutline } from "react-icons/md";

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
      setError("You have to write something");
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
    <div className="flex items-center justify-center">loading</div>
  ) : (
    <section className="bg-gray-500 p-10 min-h-screen ">
      <div className="bg-gray-200  text-gray-800  p-5 rounded-2xl flex flex-col gap-5 items-center text-center max-w-7xl mx-auto">
        <p className="text-4xl font-semibold text-center pb-5">
          Hey {user.name} !
        </p>
        <p className=" font-light text-2xl">"{user.quote}"</p>
      </div>

      <div className="mt-10 mb-10   flex  text-gray-800  flex-col gap-6 max-w-7xl mx-auto bg-gray-200 rounded-2xl p-10">
        <h1 className="text-4xl pb-5 font-semibold  text-center">Activities</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {edit && <ModalEdit setEdit={setEdit} idToEdit={idToEdit} />}

        <ul className="space-y-4">
          {activities?.map((activity) => (
            <Activity
              setEdit={setEdit}
              activity={activity}
              handleDelete={handleDelete}
              key={activity._id}
              setIdToEdit={setIdToEdit}
            />
          ))}
        </ul>
        <button
          onClick={() => setCreate(true)}
          disabled={create}
          className="disabled:bg-gray-400 w-fit mx-auto flex items-center gap-2 bg-gray-800 text-white font-semibold p-4 rounded-lg cursor-pointer hover:bg-gray-600 focus:outline-none  transition duration-300"
        >
          <MdAddCircleOutline size={30} /> New activity
        </button>
        <form
          className={`${!create ? "hidden" : ""} space-y-4 w-1/2 mx-auto`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="project"
            placeholder="New Activity"
            onChange={(event) => setNewActivity(event.target.value)}
            value={newActivity}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none "
          />
          <button
            disabled={isLoading}
            className="w-full py-3 bg-gray-800 text-white rounded-lg hover:cursor-pointer  hover:bg-gray-600 "
          >
            Add
          </button>
        </form>
      </div>
    </section>
  );
};
export default Home;
