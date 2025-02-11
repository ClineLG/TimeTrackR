import { Link, useLocation } from "react-router-dom";

const Header = ({ checkUser }: { checkUser: () => string | undefined }) => {
  const location = useLocation();

  return (
    location.pathname !== "/" && (
      <nav>
        {checkUser() ? (
          <>
            <Link to="/">TimeTracR</Link>
            <Link to="/Home">Mes Activités</Link>
            <Link to="/statistics">Mes Statistiques</Link>
            <Link to="/Home">Mon compte</Link>
          </>
        ) : (
          <Link to="/">TimeTracR</Link>
        )}
      </nav>
    )
  );
};
export default Header;
