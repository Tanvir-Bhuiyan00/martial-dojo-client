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
      <div ref={sliderRef} className="keen-slider ">
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider1} sliderTitle="Learn Kungfu"></BannerTemplate>
        </div>
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider2} sliderTitle="Learn Boxing"></BannerTemplate>
        </div>
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider3} sliderTitle="Learn Karate"></BannerTemplate>
        </div>
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider4} sliderTitle="Learn Fencing"></BannerTemplate>
        </div>
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider5} sliderTitle="Learn Taekwondo"></BannerTemplate>
        </div>
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider6} sliderTitle="Learn mexican wrestling"></BannerTemplate>
        </div>
      </div>
    </>
  );
};

export default Banner;
