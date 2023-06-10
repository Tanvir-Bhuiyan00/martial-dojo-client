import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import { FaFirstOrderAlt, FaHome, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { SiGoogleclassroom } from "react-icons/si";
import { useState } from "react";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Toggle */}
      <div className="z-50 inset-0 flex items-center justify-end md:hidden">
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
        className={`bg-neutral text-white w-80 flex flex-col ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        {/* Sidebar Content */}
        <div className="p-4">
          <ul className="menu p-4 w-80">
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
