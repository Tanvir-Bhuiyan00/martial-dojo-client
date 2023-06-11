import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserAlt, FaUserShield } from "react-icons/fa";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeAdmin = (user) => {
    fetch(`${import.meta.env.VITE_api_url}/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleMakeInstructor = (user) => {
    fetch(`${import.meta.env.VITE_api_url}/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDelete = (user) => {};
  return (
    <div className="w-full">
      <Helmet>
        <title>Martial Dojo | Manage Users</title>
      </Helmet>
      <h3 className="text-5xl text-center font-display font-semibold my-10">
        Total Users: {users.length}
      </h3>
      <div className="overflow-x-auto overflow-y-auto  md:max-h-96  mx-40">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td className="font-bold">{user.name}</td>
                <td>{user.email}</td>
                <td className="flex justify-around gap-5 items-center">
                  <span className="">

                    {user.role === "admin" ? (
                      "admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost bg-success rounded-se-2xl text-white"
                      >
                        <FaUserShield></FaUserShield>
                      </button>
                    )}
                  </span>
                  <span className="">
                    {user.role === "instructor" ? (
                      "instructor"
                    ) : (
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-ghost bg-info rounded-se-2xl text-white"
                      >
                        <FaUserAlt></FaUserAlt>
                      </button>
                    )}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost bg-error  text-base-100"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
