const BannerTemplate = ({sliderVid,sliderTitle, sliderText}) => {
  return (
    <div className="hero min-h-screen "  style={{ position: "relative" }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(50%)",
        }}
      >
        <source src={sliderVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-display font-bold">{sliderTitle}</h1>
          <p className="mb-5 font-body">
            {sliderText}
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate;
