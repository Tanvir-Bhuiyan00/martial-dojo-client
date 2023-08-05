import { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "aos/dist/aos.css";
import AOS from "aos";
import { FiCheckCircle } from "react-icons/fi";
import Heading from "../../../components/Heading/Heading";

const Benefits = () => {
  const benefits = [
    { text: "Build Strength", icon: <FiCheckCircle /> },
    { text: "Improve Flexibility", icon: <FiCheckCircle /> },
    { text: "Learn Self-Defense", icon: <FiCheckCircle /> },
    { text: "Boost Confidence", icon: <FiCheckCircle /> },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section id="benefits" className="md:pt-10">
      <Heading className="md:mb-5" heading="Benefits" />
      <div className="my-10 p-20">
        <div className=" mx-auto grid md:grid-cols-4 gap-6 text-center w-3/4">
          {benefits.map((benefit, index) => (
            <CSSTransition key={index} classNames="fade" timeout={500}>
              <div
                className="flex items-center font-bold text-base-200 text-center bg-accent py-4 px-6 w-48 rounded-xl"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                <span className="mr-2 text-2xl">{benefit.icon}</span>
                <p>{benefit.text}</p>
              </div>
            </CSSTransition>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
