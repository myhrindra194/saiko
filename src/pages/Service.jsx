import { features } from "../utils/data";

const Service = () => {
  return (
    <div className="py-10 flex flex-col justify-center px-8 md:px-20 animate-fade-up animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forwards">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 ">Our Services</h1>
      <p className="mb-12 max-w-2xl">
        Discover our comprehensive mental health solutions designed to support
        you every step of the way.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 bg-white/50 hover:bg-white/70"
          >
            <div className="text-3xl mb-6 text-purple-600">{feature.icon}</div>
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              {feature.title}
            </h2>
            <p className="text-sm mb-6">{feature.description}</p>
            <button className="px-6 py-2 rounded-2xl text-sm font-semibold text-white dark:bg-purple-600 dark:hover:bg-purple-700 bg-purple-500 hover:bg-purple-600">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
