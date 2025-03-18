const Service = () => {
  return (
    <div className="h-full relative overflow-hidden perspective-container">
      <div className="absolute inset-0 z-0 bg-retro-grid dark:bg-retro-grid-dark w-full"></div>

      <div className="h-full mx-auto relative z-10 px-4 sm:px-8 md:px-12 lg:px-20 animate-fade-up animate-once animate-duration-1000 animate-ease-linear animate-normal animate-fill-forwards">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-600 mb-4 text-center">
          Empowering Your Mental Health Journey
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto">
          Our platform offers a safe space to explore, heal, and grow. From
          professional therapy to self-help tools, we provide the resources you
          need to take control of your mental well-being.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 xl:py-20 py-10">
          {/* Online Therapy */}
          <div className="bg-white/20 dark:bg-slate-500/20 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-white/10 dark:border-slate-700/10 sm:col-span-1 lg:col-span-1 lg:row-span-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-2 sm:mb-4">
              Online Therapy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
              Connect with licensed therapists through secure video sessions.
              Personalized care tailored to your needs, available anytime,
              anywhere.
            </p>
          </div>

          {/* Mental Health Resources */}
          <div className="bg-white/20 dark:bg-slate-500/20 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-white/10 dark:border-slate-700/10 sm:col-span-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-2 sm:mb-4">
              Mental Health Resources
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
              Access a wealth of articles, guides, and tools designed to help
              you understand and manage your mental health effectively.
            </p>
          </div>

          {/* Support Groups */}
          <div className="bg-white/20 dark:bg-slate-500/20 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-white/10 dark:border-slate-700/10 sm:col-span-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-2 sm:mb-4">
              Support Groups
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
              Join our compassionate community to share experiences, gain
              insights, and find support from others on similar journeys.
            </p>
          </div>

          {/* Mood Tracker & Journaling */}
          <div className="bg-white/20 dark:bg-slate-500/20 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-white/10 dark:border-slate-700/10 sm:col-span-2 lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 mb-2 sm:mb-4">
              Mood Tracker & Journaling
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
              Monitor your emotions, set goals, and reflect on your progress
              with our intuitive mood tracking and journaling tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
