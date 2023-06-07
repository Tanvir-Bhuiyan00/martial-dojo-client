import { Link } from "react-router-dom";

const NavBar = () => {
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
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </>
  );
  return (
    <div className="navbar max-w-screen-xl mx-auto bg-base-100 my-5">
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
            className="menu menu-sm font-body font-medium dropdown-content mt-3 p-2 tracking-wider shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost font-display text-primary text-3xl normal-case ">
          Martial<span className="text-neutral ml-0">Dojo</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu tracking-wider font-medium menu-horizontal font-body px-1">
          {navOptions}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="py-2 px-5 rounded-xl text-sm font-semibold text-base-200 bg-accent  border-0 font-body tracking-wider">Login</button>
      </div>
    </div>
  );
};

export default NavBar;
