import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import StudentHome from "../Pages/Dashboard/Student/StudentHome/StudentHome";
import InstructorHome from "../Pages/Dashboard/Instructor/InstructorHome/InstructorHome";
import AddClass from "../Pages/Dashboard/Instructor/AddClass/AddClass";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses/MyClasses";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import SelectedClasses from "../Pages/Dashboard/Student/SelectedClasses/SelectedClasses";
import Payment from "../Pages/Dashboard/Payment/Payment";
import EnrolledClasses from "../Pages/Dashboard/Student/EnrolledClasses/EnrolledClasses";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "classes",
        element: <Classes></Classes>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // admin route
      {
        path: "adminhome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manageclasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      // instructor route
      {
        path: "instructorhome",
        element: (
          <InstructorRoute>
            <InstructorHome></InstructorHome>
          </InstructorRoute>
        ),
      },
      {
        path: "addclass",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "myclasses",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },
      // student route
      {
        path: "studenthome",
        element: (
          <PrivateRoute>
            <StudentHome></StudentHome>
          </PrivateRoute>
        ),
      },
      {
        path: "selectedClasses",
        element: (
          <PrivateRoute>
            <SelectedClasses></SelectedClasses>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "enrolledclasses",
        element: (
          <PrivateRoute>
            <EnrolledClasses></EnrolledClasses>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "errorpage",
    element: <ErrorPage></ErrorPage>,
  },
]);
