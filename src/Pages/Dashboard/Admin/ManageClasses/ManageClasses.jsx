import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    data: classes = [],
    refetch,
    isLoading,
    queryClient,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });
  console.log(classes);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const openFeedbackModal = (courseId) => {
    setSelectedCourseId(courseId);
    setShowFeedbackModal(true);
  };

  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
    setSelectedCourseId("");
  };

  const handleFeedbackSubmit = (reason) => {
    axiosSecure
      .patch(`/classes/feedback/${selectedCourseId}`, {
        feedback: reason,
      })
      .then((response) => {
        closeFeedbackModal();
        if (response.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Your feedback has been updated`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to update feedback:", error);
      });
  };

  const updateClassStatus = useMutation(
    (data) => {
      return axiosSecure.patch(`/classes/admin/${data.classId}`, {
        status: data.status,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("classes");
      },
      onError: () => {
        queryClient.invalidateQueries("classes");
      },
    }
  );

  const handleApprove = (courseId) => {
    updateClassStatus.mutate({ classId: courseId, status: "approved" });
    refetch();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Class has been Approved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDeny = (courseId) => {
    updateClassStatus.mutate({ classId: courseId, status: "denied" });
    refetch();
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Your Class has been Denied",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!classes || classes.length === 0) {
    return <div>No courses found.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Martial Dojo | Manage Classes</title>
      </Helmet>
      <div>
        <h1 className="text-5xl text-center font-display font-semibold my-10">
          Manage Classes
        </h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Class Image</th>
                <th>Class name</th>
                <th>Instructor name</th>
                <th>Instructor email</th>
                <th>Available seats</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((course, index) => (
                <tr key={course._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={course.image} alt="Course Image" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{course.name}</div>
                  </td>
                  <td>{course.instructorName}</td>
                  <td>{course.instructorEmail}</td>
                  <td className="text-center font-bold">
                    {course.availableSeats}
                  </td>
                  <td className="text-center font-bold">${course.price}</td>
                  <td className="text-center text-gray-400">{course.status}</td>
                  <th className="text-center">
                    <button
                      onClick={() => handleApprove(course._id)}
                      disabled={course.status !== "pending"}
                      className="btn btn-success w-28 btn-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeny(course._id)}
                      disabled={course.status !== "pending"}
                      className="btn btn-error my-1 w-28  btn-xs"
                    >
                      Deny
                    </button>
                    <button
                      onClick={() => openFeedbackModal(course._id)}
                      className="btn btn-info w-28 btn-xs"
                    >
                      Feedback
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          {showFeedbackModal && (
            <FeedbackModal
              onSubmit={handleFeedbackSubmit}
              onClose={closeFeedbackModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManageClasses;
