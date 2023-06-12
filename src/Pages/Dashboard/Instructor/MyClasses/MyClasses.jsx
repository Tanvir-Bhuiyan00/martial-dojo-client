import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
const MyClasses = () => {
  const { user } = useAuth();
  const [myClasses, setMyClasses] = useState([]);

  useEffect(() => {
    if (user?.email) {
      const url = `${
        import.meta.env.VITE_api_url
      }/classes/instructor?email=${encodeURIComponent(user.email)}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setMyClasses(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
  }, [user]);
  return (
    <>
      <Helmet>
        <title>Martial Dojo | My Classes</title>
      </Helmet>
      <div className="md:mx-20">
        <h3 className="text-5xl text-center font-display font-semibold my-10">
          My Classes
        </h3>
        <div className="grid md:grid-cols-2 gap-10">
          {myClasses.map((myClass) => (
            <div key={myClass._id} className="card w-96 relative bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={myClass.image} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{myClass.name}</h2>
                <p>By {myClass.instructorName}</p>
                <div className="absolute mt-1 mr-3 top-0 right-0 px-3 text-xm font-medium bg-primary rounded-xl">
                Enrolled: { myClass.enrolled}
                </div>
                <div className="card-actions">
                  <p
                    className={`p-3 ${
                      myClass.status === "denied"
                        ? "text-error bg-slate-300"
                        : "text-base-200"
                    }  bg-accent font-bold rounded-se-xl`}
                  >
                    Status: {myClass.status}
                  </p>
                  <p className="font-semibold">
                    {myClass.status === "denied" ? myClass.feedback : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyClasses;
