import axios from "axios";
import { useEffect, useState } from "react";
import { UserProps } from "../UserTypes";

const Home = ({ user }: UserProps) => {
  const [activities, setActivities] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.log("User is null");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:3000/activities/all",
          {
            headers: {
              Authorization: "Bearer " + user.token,
            },
          }
        );
        setActivities(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <>
      <div>loading</div>
    </>
  ) : (
    <section>
      <h1>Mes projets</h1>
      <ul>
        {activities?.map((name) => (
          <li>{name}</li>
        ))}
      </ul>
    </section>
  );
};
export default Home;
