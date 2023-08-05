import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Heading from "../../../components/Heading/Heading";

const BestInstructor = () => {
  const [axiosSecure] = useAxiosSecure();
  const { role, data: instructor = [] } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/instructor");
      return res.data;
    },
  });

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <>
      <div className="divider"></div>
      <Heading heading={"Popular Instructors"}></Heading>
      {role === "loading" && (
        <div className="flex justify-center items-center h-[40vh]">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={controls}>
        <div className="grid md:grid-cols-3 gap-10 max-w-screen-xl  md:mx-32 my-8">
          {instructor.slice(0, 6).map((shifu) => (
            <div key={shifu._id} className="card bg-secondary-content w-full md:w-80 shadow-xl">
              <div className="card-body text-center">
                <h2 className="card-title flex justify-center text-accent">{shifu.name}</h2>
                <p>{shifu.email}</p>
              </div>
              <figure>
                <img className="h-48 w-full rounded-b-xl" src={shifu.photoURL} alt="Shoes" />
              </figure>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="divider"></div>
    </>
  );
};

export default BestInstructor;
