import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import martialImg from "../../assets/photo/logo2.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Helmet>
        <title>Martial Dojo | Login</title>
      </Helmet>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
          <div className=" md:w-[400px]">
            <div className="text-center mb-10">
              <h1 className="text-5xl font-bold font-display mt-10 md:mt-0">Login now!</h1>
            </div>
            <img className="w-52 md:w-64 mx-auto" src={martialImg} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit()} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered relative"
                />
                {errors.password && (
                  <span className="text-red-600">Password is required</span>
                )}
                <button
                  style={{ marginTop: "3.3rem" }}
                  className="absolute right-10 text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
              <p className="mt-3">
                <small>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-primary font-semibold link-hover"
                  >
                    Create An Account
                  </Link>{" "}
                </small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
