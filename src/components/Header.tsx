import { Link, useLocation } from "react-router-dom";
import { UserType } from "../UserTypes";

const Header = ({ user }: { user: UserType | null }) => {
  const location = useLocation();

  return (
    location.pathname !== "/" && (
      <nav>
        <Link to={user ? "/home" : "/"}>TimeTracR</Link>
      </nav>
    )
  );
};
export default Header;
