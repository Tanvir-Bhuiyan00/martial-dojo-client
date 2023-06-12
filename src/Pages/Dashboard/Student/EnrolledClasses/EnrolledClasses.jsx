import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EnrolledClasses = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get("/enrolled")
      .then((res) => {
        setEnrolledClasses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full mx-16 mt-10">
      <h2 className=" text-center font-display font-bold text-4xl mb-10">
        My Enrolled Courses
      </h2>
      <table className="w-full">
        <thead>
          <tr className="  uppercase text-center">
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-5">Course Name</th>
            <th className="py-3 px-6">Price</th>
            <th className="py-3 px-6">Transaction ID</th>
          </tr>
        </thead>
        <tbody className="">
          {enrolledClasses.map((course, index) => (
            <tr
              key={course.transactionId}
              className="border-b border-gray-200 py-10"
            >
              <td className="py-3 px-6 text-left ">{index + 1}</td>
              <td className="py-3 px-6 text-left ">{course.name}</td>
              <td className="py-3 px-6 text-left ">${course.price}</td>
              <td className="py-3 px-6 text-left">{course.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrolledClasses;
