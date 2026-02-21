'use client';

const ProgressTimeline = () => {
  const milestones = [
    {
      phase: 'Phase 1',
      title: 'Ideation & Research',
      status: 'completed',
      description: 'Space-med research, fluid-shift analysis, Mica1 concept',
      date: '2024 Q4',
      icon: '💡',
    },
    {
      phase: 'Phase 2',
      title: 'Prototype v0.1',
      status: 'in-progress',
      description: '7-mode wearable, edge processing, $15-20 BOM target',
      date: '2025 Q1-Q2',
      icon: '🔬',
    },
    {
      phase: 'Phase 3',
      title: 'Clinical Validation',
      status: 'upcoming',
      description: 'Earth-based trials, orthopedic applications, data collection',
      date: '2025 Q3-Q4',
      icon: '🏥',
    },
    {
      phase: 'Phase 4',
      title: 'Mars Qualification',
      status: 'upcoming',
      description: 'Space-grade certification, multi-planetary health systems',
      date: '2026+',
      icon: '🚀',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            From <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Xi'an Dorms</span> to <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Mars Hub</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building the trillion-dollar empire, one prototype at a time
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-600 rounded-full"></div>

          {/* Milestones */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                  }`}
                >
                  <div
                    className={`p-6 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                      milestone.status === 'completed'
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500/50 shadow-lg shadow-green-500/20'
                        : milestone.status === 'in-progress'
                        ? 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                        : 'bg-white/50 dark:bg-gray-800/50 border-gray-300/50 dark:border-gray-600/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                        {milestone.phase}
                      </span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {milestone.date}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Status badge */}
                    <div className="mt-4">
                      {milestone.status === 'completed' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Completed
                        </span>
                      )}
                      {milestone.status === 'in-progress' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold">
                          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></div>
                          In Progress
                        </span>
                      )}
                      {milestone.status === 'upcoming' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-semibold">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Center Icon - Desktop */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-blue-500/50 items-center justify-center text-3xl z-10 border-4 border-white dark:border-gray-900">
                  {milestone.icon}
                </div>

                {/* Mobile Icon */}
                <div className="md:hidden flex w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg items-center justify-center text-2xl my-4 border-4 border-white dark:border-gray-900">
                  {milestone.icon}
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want to join the mission to multi-planetary healthcare?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-400/60 hover:scale-105"
          >
            Join the Mission
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProgressTimeline;
