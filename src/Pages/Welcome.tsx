import { Link } from "react-router-dom";
import welcome from "../assets/welcome.png";
import { TokenProps } from "../UserTypes";
import home from "../assets/homePage.png";
import pie from "../assets/pie.png";
import bar from "../assets/bar.png";

const Welcome = ({ checkUser }: TokenProps) => {
  return (
    <>
      <section className="flex items-center justify-center  text-white text-center ">
        <img
          src={welcome}
          alt="image"
          className="object-cover h-[100vh] w-full opacity-90  "
        />
        <div className="absolute text-gray-200  bg-[rgb(0,0,0)]/50 w-full py-20 ">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Track your activity, improve your productivity.{" "}
          </h1>
          <p className="text-lg  mb-6">
            With ActivityTrackR, easily track your working hours, analyze your
            progress, and optimize your time.
          </p>
          <Link
            to={checkUser() ? "/home" : "/signup"}
            className="px-6 py-3 bg-amber-600 shadow-2xl shadow-amber-600 text-black rounded-lg text-xl hover:bg-amber-500 transition duration-300"
          >
            {checkUser() ? "My Activities" : "Try now !"}
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white" id="features">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">Main Features</h2>
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 gap-12">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col gap-4">
              <h3 className="text-2xl font-semibold">Time Tracking</h3>
              <p>
                Easily log the time you dedicate to each task with a simple and
                intuitive interface. Track your work hours, breaks, and personal
                projects effortlessly.
              </p>
              <img
                src={home}
                alt="home page picture"
                className="object-cover rounded-2xl "
              />
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col gap-4">
              <h3 className="text-2xl font-semibold">Detailed Reports</h3>
              <p>
                Access comprehensive visual reports that show you exactly how
                you spend your time. Identify patterns, areas for improvement,
                and measure your productivity over time.{" "}
              </p>
              {/* <img src={pie} alt="" /> */}
              <img src={bar} className="object-cover rounded-2xl" alt="" />
            </div>

            {/* <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">
                Productivity Optimization
              </h3>
              <p className="mt-4">
                {" "}
                Never forget to track your progress. Earn badges and rewards for
                completing tasks and achieving goals, and celebrate your
                productivity milestones.
              </p>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};
export default Welcome;
