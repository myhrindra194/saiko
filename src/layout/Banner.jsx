import { NavLink } from "react-router";
import ai from "../assets/ai4.png";
import Button from "../components/Button";

const Banner = () => {
  return (
    <div className="w-full h-auto animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forwards md:px-20 px-8 mt-6 pt-18">
      <h1 className="dark:text-white text-3xl sm:text-5xl md:text-6xl font-sans text-center w-auto md:w-[40rem] mx-auto animate-fade-up max-md:mt-8">
        Your Mental Health Matters
      </h1>
      <div className="w-full h-auto md:flex justify-between items-center">
        <div className="md:w-50 mt-10 text-center md:text-start animate-fade-right">
          <h3 className="md:text-2xl text-lg  pb-5">
            You <strong>don&apos;t</strong> have to <strong>struggle</strong> in
            silence
          </h3>
          <Button>
            <NavLink to="/about">Learn more</NavLink>
          </Button>
        </div>
        <div className="flex justify-center md:mt-0">
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
