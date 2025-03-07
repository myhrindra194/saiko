import about from "../assets/about.png";

const About = () => {
  return (
    <div className="h-full flex flex-row items-end justify-between ">
      <section className="h-full flex flex-col justify-evenly animate-fade-right animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forward col-8">
        <h2 className="text-6xl w-3xl ">
          SaÏko : Your Partner for{" "}
          <span className="text-purple-600">Mental</span> Wellness
        </h2>
        <div className="flex flex-row">
          <div className="w-28  h-0.5 dark:bg-white bg-slate-800"></div>
          <p className="text-lg w-xl ms-20 -translate-y-3">
            Discover a comprehensive online platform dedicated to your mental
            well-being. We offer inspiring resources, expert advice and a
            supportive community to help you navigate life&apos;s challenges.
            Our platform is designed to provide you with personalized guidance,
            coping strategies and tools to manage stress, anxiety and other
            mental health concerns. With Saiko, you&apos;ll have access to a
            wealth of information, expert insights and a safe space to share
            your thoughts and feelings. Whether you&apos;re looking to improve
            your mental health, build resilience or simply find support, Saiko
            is here to help.
          </p>
        </div>
      </section>
      <div className="relative col-3 rounded-full animate-fade-left animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forward">
        <div className=" absolute dark:bg-indigo-950/80 bg-purple-400/50 blur-2xl inset-0 rounded-full"></div>
        <img src={about} alt="Image" className="relative " />
      </div>
    </div>
  );
};

export default About;
