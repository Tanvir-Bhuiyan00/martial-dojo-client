import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BestClasses from "../BestClasses/BestClasses";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Martial Dojo | Home</title>
      </Helmet>
      <Banner></Banner>
      <BestClasses></BestClasses>
    </div>
  );
};

export default Home;