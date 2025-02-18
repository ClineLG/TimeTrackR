import { Link, useLocation } from "react-router-dom";

const Header = ({ checkUser }: { checkUser: () => string | undefined }) => {
  const location = useLocation();

  return checkUser() ? (
    <nav className="bg-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-indigo-600 text-2xl font-semibold hover:text-indigo-200"
        >
          TimeTracR
        </Link>
        <div className="space-x-4">
          <Link
            to="/Home"
            className="text-indigo-600 text-lg hover:text-indigo-200 transition duration-200"
          >
            Mes Activités
          </Link>{" "}
          <Link
            className="text-indigo-600 text-lg hover:text-indigo-200 transition duration-200"
            to="/statistics"
          >
            Mes Statistiques
          </Link>
          <Link
            to="/account"
            className="text-indigo-600 text-lg hover:text-indigo-200 transition duration-200"
          >
            Mon compte
          </Link>
        </div>
      </div>
    </nav>
  ) : (
    location.pathname !== "/" && (
      <div className="bg-white p-4">
        <Link
          to="/"
          className="text-indigo-600 text-2xl font-semibold hover:text-indigo-200"
        >
          TimeTracR
        </Link>
      </div>
    )
  );
};
export default Header;
