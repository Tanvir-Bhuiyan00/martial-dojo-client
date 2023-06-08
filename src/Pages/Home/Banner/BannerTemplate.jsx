const BannerTemplate = ({sliderVid,sliderTitle, sliderText}) => {
  return (
    <div className="hero min-h-screen min-w-full "  style={{ position: "relative",width: "100vw", }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(35%)",
        }}
      >
        <source src={sliderVid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="md:w-2/4">
          <h1 className="mb-5 text-5xl font-display font-bold">{sliderTitle}</h1>
          <p className="mb-5  font-body tracking-widest p-6 rounded-xl">
            {sliderText}
          </p>
          <button className="btn btn-primary font-body">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate;
