import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const Instructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: instructors = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/instructor");
      return res.data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Martial Dojo | Instructors</title>
      </Helmet>
      <div className="md:mx-20">
        <h3 className="text-5xl text-center font-display font-semibold my-10">
          Instructors
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          {instructors.map((instructor) => (
            <div key={instructor._id} className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={instructor.photoURL} alt="" className="rounded-xl h-64 w-64" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{instructor.name}</h2>
                
                <div className="">
                Email: {instructor.email}
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Instructors;
