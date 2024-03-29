import { Link, useLocation } from "react-router-dom";
import ToggleThemeBtn from "../ToggleThemeBtn/ToggleThemeBtn";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";

const NavBar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const renderDashboardLink = () => {
    if (isAdmin) {
      return (
        <li>
          <Link to="/dashboard/adminhome">Dashboard</Link>
        </li>
      );
    } else if (isInstructor) {
      return (
        <li>
          <Link to="/dashboard/instructorhome">Dashboard</Link>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/dashboard/studenthome">Dashboard</Link>
        </li>
      );
    }
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/instructors">Instructors</Link>
      </li>
      <li>
        <Link to="/classes">Classes</Link>
      </li>
      {user?.email && renderDashboardLink()}
    </>
  );
  return (
    <div
      className={`navbar py-3 md:px-10 ${
        isHomePage ? "fixed" : ""
      } z-10 bg-base-100 bg-opacity-20 text-white`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm font-body font-semibold dropdown-content mt-3 p-2 tracking-wider shadow bg-base-100 text-base-content bg-opacity-20 rounded-box w-52"
          >
            {navOptions}
            <ToggleThemeBtn></ToggleThemeBtn>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost font-display text-primary text-xl md:text-3xl normal-case "
        >
          Martial<span className="text-secondary ml-0">Dojo</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu tracking-wider text-base-content font-semibold menu-horizontal font-body px-1">
          {navOptions}
          <ToggleThemeBtn></ToggleThemeBtn>
        </ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <>
            <div className="avatar mr-3">
              <div
                title={user?.displayName}
                className="w-8 md:w-10 rounded-full"
              >
                <img src={user?.photoURL} className="image-full " />
              </div>
            </div>
            <button
              onClick={handleLogOut}
              className="py-2 px-5 rounded-xl text-sm font-semibold text-base-200  bg-accent  border-0  tracking-wider"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="login">
            <button className="py-1 md:py-2 px-3 md:px-5 rounded-xl text-sm font-semibold text-base-200 bg-accent  border-0  tracking-wider">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
