import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import slider1 from "../../../assets/video/slider1.mp4";
import slider2 from "../../../assets/video/slider2.mp4";
import slider3 from "../../../assets/video/slider3.mp4";
import slider4 from "../../../assets/video/slider4.mp4";
import slider5 from "../../../assets/video/slider5.mp4";
import slider6 from "../../../assets/video/slider6.mp4";
import BannerTemplate from "./BannerTemplate";
const Banner = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <>
      <div ref={sliderRef} className="keen-slider w-full">
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider1} sliderTitle="Learn Kungfu" sliderText="Learning Kung Fu requires discipline, strength, and balance, as methods integrate the body and mind, resulting in personal progress."></BannerTemplate>
        </div>
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider2} sliderTitle="Learn Boxing" sliderText="Learning Boxing involves building mental focus and discipline while also developing strength, speed, and defensive abilities, resulting in improved physical condition and self-confidence. "></BannerTemplate>
        </div>
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider3} sliderTitle="Learn Karate" sliderText="Learning Karate requires developing discipline, self-defense skills, and mental fortitude, as well as encouraging physical fitness and personal growth."></BannerTemplate>
        </div>
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider4} sliderTitle="Learn Fencing" sliderText="Fencing requires acquiring precise footwork, quick reactions, and strategic thinking, as well as combining athleticism with tactical expertise to participate in an exciting and exquisite combat sport."></BannerTemplate>
        </div>
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider5} sliderTitle="Learn Taekwondo" sliderText="Taekwondo teaches strong kicks, rapid strikes, and efficient self-defense skills while also instilling discipline, self-confidence, and mental focus."></BannerTemplate>
        </div>
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider6} sliderTitle="Learn mexican wrestling" sliderText="Mastering lucha libre, or Mexican wrestling, entails mastering acrobatic movements, high-flying acrobatics, and theatrical theatrics to create an exhilarating and captivating display. "></BannerTemplate>
        </div>
      </div>
    </>
  );
};

export default Banner;
