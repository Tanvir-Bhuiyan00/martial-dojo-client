import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import {
  FaFirstOrderAlt,
  FaHome,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { SiGoogleclassroom } from "react-icons/si";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  const [isInstructor] = useInstructor();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Toggle */}
      <div className=" mb-10 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-4 focus:outline-none bg-primary"
        >
          <svg
            className="w-6 h-6 text-base-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-primary-focus text-base-100 w-80 flex flex-col ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        {/* Sidebar Content */}
        <div className="p-4 ">
          <ul className="menu p-4 w-72">
            <div className="flex justify-center mt-5">
              <div>
                <div className="avatar flex justify-center">
                  <div
                    title={user?.email}
                    className="w-14 md:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-8"
                  >
                    <img src={user?.photoURL} className="image-full " />
                  </div>
                </div>
                <div className="my-5">
                  <p className="text-center font-semibold">{user?.displayName}</p>
                  <p
                    className={`font-bold p-1 mt-2 rounded-ss-2xl ${
                      isAdmin
                        ? "bg-primary text-neutral-focus"
                        : isInstructor
                        ? "bg-accent text-neutral"
                        : "bg-secondary text-neutral"
                    } flex justify-center`}
                  >
                    {isAdmin
                      ? "Admin"
                      : isInstructor
                      ? "Instructor"
                      : "Student"}
                  </p>
                </div>
              </div>
            </div>
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/dashboard/adminhome">
                    <FaHome /> Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageclasses">
                    <FcManager /> Manage Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageusers">
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>
              </>
            )}
            {isInstructor && (
              <>
                <li>
                  <NavLink to="/dashboard/instructorhome">
                    <FaHome /> Instructor Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addclass">
                    <FaUtensils /> Add A Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myclasses">
                    <SiGoogleclassroom /> My Classes
                  </NavLink>
                </li>
              </>
            )}
            {!isAdmin && !isInstructor && (
              <>
                <li>
                  <NavLink to="/dashboard/studenthome">
                    <FaHome /> Student Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/selectedclasses">
                    <FaFirstOrderAlt /> Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/enrolledclasses">
                    <SiGoogleclassroom /> Enrolled Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymenthistory">
                    <FaWallet /> Payment History
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider w-10/12"></div>
            <li>
              <NavLink to="/">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes">Classes</NavLink>
            </li>
            <li>
              <NavLink to="/instructor">Instructor</NavLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="">
        {/* Page Content */}
        <div className="container mx-auto px-4 py-6">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
