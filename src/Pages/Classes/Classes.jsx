import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useSelectedClasses from "../../hooks/useSelectedClasses";

const Classes = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useSelectedClasses();
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes/approved");
      return res.data;
    },
  });
  console.log(classes);

  const handleEnroll = (classes) => {
    if (user && user.email) {
      const classEnroll = {
        _id: classes._id,
        image: classes.image,
        name: classes.name,
        instructorName: classes.instructorName,
        availableSeats: classes.availableSeats,
        price: classes.price,
        instructorEmail: classes.instructorEmail,
        email: user.email,
      };
      fetch(`${import.meta.env.VITE_api_url}/selectedClasses`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(classEnroll),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              title: "Added to Selected Classes",
              position: "center",
              icon: "success",
              showConfirmButton: "false",
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to enroll course",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Martial Dojo | Classes</title>
      </Helmet>
      <div className="md:mx-20">
        <h3 className="text-5xl text-center font-display font-semibold my-10">
          My Classes
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          {classes.map((allClass) => (
            <div
              key={allClass._id}
              className={`card w-96 relative ${
                allClass.availableSeats === 0 ? "bg-red-500" : "bg-base-200"
              }  shadow-xl`}
            >
              <figure className="px-10 pt-10 mt-3">
                <img src={allClass.image} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{allClass.name}</h2>
                <p>By {allClass.instructorName}</p>
                <div className="absolute my-3 mr-3 top-0 right-0 px-3 text-xm font-medium bg-primary-focus rounded-e-2xl">
                  Enrolled: {allClass.enrolled}
                </div>
                <div className="absolute my-3 ml-3 top-0 left-0 px-3 text-xm font-medium bg-secondary rounded-s-2xl">
                  Available: {allClass.availableSeats}
                </div>
                <div className="card-actions mt-3">
                  <button
                    onClick={() => handleEnroll(allClass)}
                    className="btn btn-primary"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Classes;
