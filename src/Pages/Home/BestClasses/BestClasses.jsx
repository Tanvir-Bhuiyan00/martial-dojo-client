import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Heading from "../../../components/Heading/Heading";
import useAuth from "../../../hooks/useAuth";

const BestClasses = () => {
  const { loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const controls = useAnimation();
  const { status, data: classes = [] } = useQuery({
    enabled: !loading,
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/classes/approved/dsc");
      return res.data;
    },
  });
  console.log(classes);

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
      <Heading heading={"popular classes"}></Heading>
      {status === "loading" && (
        <div className="flex justify-center items-center h-[40vh]">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      <motion.div ref={ref} initial={{ opacity: 0, y: 80 }} animate={controls}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-screen-xl mx-auto my-8">
          {classes.map((card) => (
            <div
              key={card._id}
              className={`card lg:card-side ${
                card.availableSeats === 0 ? "bg-red-500/50" : "bg-base-300"
              } shadow-lg mx-2`}
            >
              <figure className="p-5 shadow-lg">
                <img
                  className="rounded-lg w-full lg:h-44"
                  src={card.image}
                  alt={card.name}
                />
              </figure>
              <div
                className={`card-body ${
                  card.availableSeats === 0 ? "bg-red-500/70" : "bg-base-200"
                } w-full rounded-lg`}
              >
                <h2 className="card-title text-primary">{card.name}</h2>
                <p className="flex items-center gap-1">
                  
                  {card.instructorName}
                </p>
                <p>
                  <b>Price: </b> ${card.price}
                </p>
                <p>
                  <b>Available Seats: </b> {card.availableSeats}
                </p>
                <p>
                  <b>Enrolled Students: </b>{" "}
                  {!card?.enrolled ? 0 : card?.enrolled}
                </p>
                <div className="card-actions">
                  <button className="btn btn-accent btn-block btn-sm">
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="divider"></div>
    </>
  );
};

export default BestClasses;
