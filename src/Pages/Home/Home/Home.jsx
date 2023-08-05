import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BestClasses from "../BestClasses/BestClasses";
import BestInstructor from "../BestInstructor/BestInstructor";
import FAQ from "../FAQ/FAQ";
import AvailableOn from "../AvailableOn/AvailableOn";
import Benefits from "../Benefits/Benefits";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Martial Dojo | Home</title>
      </Helmet>
      <Banner></Banner>
      <BestClasses></BestClasses>
      <BestInstructor></BestInstructor>
      <Benefits></Benefits>
      <FAQ></FAQ>
      <AvailableOn></AvailableOn>
    </div>
  );
};

export default Home;
