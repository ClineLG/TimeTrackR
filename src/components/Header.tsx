import { Link, useLocation } from "react-router-dom";
import { IoIosRocket } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { IoIosStats } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";

const Header = ({ checkUser }: { checkUser: () => string | undefined }) => {
  const location = useLocation();

  return checkUser() ? (
    <nav className="bg-gray-800 text-gray-200 p-4 shadow-md sticky top-0 border-b-2 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center m-2.5 gap-1.5 text-2xl font-semibold hover:text-indigo-200"
        >
          TimeTrackR <IoIosRocket />
        </Link>
        <div className="h-8 flex-auto flex gap-6 justify-end">
          <Link
            to="/Home"
            className="hover:cursor-pointer hover:border-2 p-2 gap-1.5 flex items-center rounded-2xl bg-gray-200 text-gray-800 text-lg font-bold hover:bg-gray-800 hover:text-white transition duration-200"
          >
            <p className="hidden sm:block">Activities</p>
            <TbTargetArrow />
          </Link>
          <Link
            className="hover:border-2 p-2 hover:cursor-pointer gap-1.5 flex items-center rounded-2xl bg-gray-200 text-gray-800 text-lg font-bold hover:bg-gray-800 hover:text-white transition duration-200"
            to="/statistics"
          >
            <p className="hidden sm:block ">Statistics</p>
            <IoIosStats />
          </Link>
          <Link
            to="/account"
            className="hover:border-2 p-2 flex items-center gap-1.5 hover:cursor-pointer rounded-2xl bg-gray-200 text-gray-800 text-lg font-bold hover:bg-gray-800 hover:text-white transition duration-200"
          >
            <p className="hidden sm:block">Account</p>

            <FaUserAlt />
          </Link>
        </div>
      </div>
    </nav>
  ) : (
    location.pathname !== "/" && (
      <div className="bg-gray-200 p-4">
        <Link
          to="/"
          className="flex items-center m-2.5 gap-1.5 text-2xl font-semibold hover:text-indigo-200"
        >
          TimeTrackR <IoIosRocket />{" "}
        </Link>
      </div>
    )
  );
};
export default Header;
