import about from "../assets/about.png";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-end md:px-20 px-8">
      <section className="h-full pt-10 sm:py-40 lg:py-15 xl:py-30 animate-fade-right animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forward">
        <h2 className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-medium">
          SaÏko : Your Partner for{" "}
          <span className="text-purple-600">Mental</span> Wellness
        </h2>
        <div className="flex flex-row mt-10">
          <div className="w-20 lg:w-28  h-0.5 dark:bg-white bg-slate-800"></div>
          <div>
            <p className="text-base lg:text-lg ms-4 lg:ms-20 -translate-y-3 lg:max-w-lg xl:max-w-2xl">
              Discover a comprehensive online platform dedicated to your mental
              well-being. We offer inspiring resources, expert advice and a
              supportive community to help you navigate life&apos;s challenges.
              Our platform is designed to provide you with personalized
              guidance, coping strategies and tools to manage stress, anxiety
              and other mental health concerns. With Saiko, you&apos;ll have
              access to a wealth of information, expert insights and a safe
              space to share your thoughts and feelings. Whether you&apos;re
              looking to improve your mental health, build resilience or simply
              find support, Saiko is here to help.
            </p>
          </div>
        </div>
      </section>
      <div className="relative animate-fade-left animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forward translate-y-32 lg:translate-y-0 hidden lg:block">
        <div className="absolute dark:bg-indigo-950/80 bg-purple-400/50 blur-2xl inset-0 rounded-full"></div>
        <img src={about} alt="Image" className="relative rounded-full" />
      </div>
    </div>
  );
};

export default About;
