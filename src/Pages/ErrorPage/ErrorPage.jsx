import errorVideo from "../../assets/video/page-not-found-404.mp4";

const ErrorPage = () => {
  return (
    <div className="w-full bg-base-100">

      <video className="h-screen w-full bg-base-100" autoPlay loop muted src={errorVideo}></video>
    </div>
  );
};

export default ErrorPage;
