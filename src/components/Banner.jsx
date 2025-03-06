import ai from "../assets/ai4.png";

const Banner = () => {
  return (
    <div className="w-full h-auto animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forwards">
      <h1 className="dark:text-white text-3xl sm:text-5xl md:text-6xl font-sans text-center w-auto md:w-[40rem] mx-auto animate-fade-up max-md:mt-8">
        Your Mental Health Matters
      </h1>
      <div className="w-full h-auto md:flex justify-between items-center">
        <div className="md:w-50 mt-10 text-center md:text-start">
          <h3 className="md:text-2xl text-lg animate-fade-right">
            You <strong>don&apos;t</strong> have to <strong>struggle</strong> in
            silence
          </h3>
          <button className="mt-5 text-lg font-semibold border-2 border-purple-600 px-4 py-1 rounded-2xl hover:bg-purple-600 hover:text-white">
            Learn more
          </button>
        </div>
        <div className="flex justify-center mt-6 md:mt-0">
          <img src={ai} alt="robot" className="animate-fade-up" />
        </div>
        <div className="md:flex flex-col md:w-50 mt-8 text-center text-lg md:text-end animate-fade-left">
          <h3>
            There&apos;s <strong>hope</strong> when your <strong>brain</strong>{" "}
            tells you there isn&apos;t
          </h3>
          <p className="mt-20">
            Each day we learn the griefs and tribulations which affect our
            constituents or ourselves
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
