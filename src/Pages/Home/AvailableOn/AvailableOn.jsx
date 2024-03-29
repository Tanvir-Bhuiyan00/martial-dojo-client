import Lottie from "lottie-react";
import ios from "../../../assets/appleIcon.json";
import google from "../../../assets/googleIcon.json";
import Heading from "../../../components/Heading/Heading";

const AvailableOn = () => {
  return (
    <div>
      <Heading className="mb-5" heading="Available On"></Heading>
      <div className="lg:flex mx-auto justify-center">
        <Lottie
          animationData={google}
          style={{ width: "260px" }}
          className="ms-9 lg:ms-1"
        />
        <Lottie animationData={ios} style={{ width: "320px" }} />
      </div>
    </div>
  );
};

export default AvailableOn;
