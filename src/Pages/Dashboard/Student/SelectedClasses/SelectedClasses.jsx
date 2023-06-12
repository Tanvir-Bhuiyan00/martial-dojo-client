import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import useSelectedClasses from "../../../../hooks/useSelectedClasses";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const SelectedClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const [classes, refetch] = useSelectedClasses();
  const total = classes.reduce((sum, item) => parseFloat(item.price) + sum, 0);

  const handleDelete = (item) => {
    console.log(item)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A103C",
      cancelButtonColor: "#e25ab2",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/selectedClasses/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="w-full mx-28">
      <div className="text-5xl my-5 font-display font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-3xl">Total Items: {classes.length}</h3>
        <h3 className="text-3xl">Total Price: ${total}</h3>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full ">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Classes</th>
              <th>Class Name</th>
              <th>Price</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td className="">${item.price}</td>
                <td className="flex items-center justify-around gap-3">
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost bg-error  text-base-100"
                  >
                    <FaTrashAlt />
                  </button>
                  <Link to="/dashboard/payment">
                    <button className="btn btn-primary btn-sm">PAY</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedClasses;
