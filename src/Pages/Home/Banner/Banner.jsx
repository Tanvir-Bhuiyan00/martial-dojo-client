import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import slider1 from "../../../assets/video/slider1.mp4";
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
      <div ref={sliderRef} className="keen-slider max-w-screen-xl mx-auto">
        <div className="keen-slider__slide">
          <BannerTemplate sliderVid={slider1}></BannerTemplate>
        </div>
        <div className="keen-slider__slide">2</div>
        <div className="keen-slider__slide">3</div>
        <div className="keen-slider__slide">4</div>
        <div className="keen-slider__slide">5</div>
        <div className="keen-slider__slide">6</div>
      </div>
    </>
  );
};

export default Banner;
