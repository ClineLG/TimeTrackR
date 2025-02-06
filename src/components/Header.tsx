import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    location.pathname !== "/" && (
      <nav>
        <Link to="/">TimeTracR</Link>
      </nav>
    )
  );
};
export default Header;
