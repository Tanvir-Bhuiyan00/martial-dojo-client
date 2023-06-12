import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            name,
            instructorName,
            instructorEmail,
            availableSeats,
            price,
          } = data;
          const newClass = {
            name,
            instructorName,
            instructorEmail,
            availableSeats: parseInt(availableSeats),
            price: parseFloat(price),
            image: imgURL,
            status: "pending",
            feedback: "",
            enrolled: 0,
          };
          console.log(newClass);
          axiosSecure.post("/classes", newClass).then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Class added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Martial Dojo | Add A Class</title>
      </Helmet>
      <div className="w-full md:mx-32 mt-5 md:py-5">
        <h1 className="text-5xl text-center font-display font-semibold mb-5">
          Add A Class
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text font-semibold">Class Name*</span>
            </label>
            <input
              type="text"
              placeholder="Class Name"
              {...register("name", { required: true, maxLength: 120 })}
              className="input input-bordered w-full "
            />
          </div>
          <div className="flex my-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Name*
                </span>
              </label>
              <input
                type="text"
                {...register("instructorName", { required: true })}
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full ml-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Instructor Email*
                </span>
              </label>
              <input
                type="text"
                {...register("instructorEmail", { required: true })}
                defaultValue={user?.email}
                readOnly
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="flex my-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Available Seats*
                </span>
              </label>
              <input
                type="number"
                {...register("availableSeats", { required: true })}
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full ml-4">
              <label className="label">
                <span className="label-text font-semibold">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </div>
          </div>
          <div className="form-control w-full my-4">
            <label className="label">
              <span className="label-text font-semibold">Class Image*</span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full "
            />
          </div>
          <input className="btn btn-sm mt-4" type="submit" value="Add Class" />
        </form>
      </div>
    </>
  );
};

export default AddClass;
