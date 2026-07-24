import React from "react";

const Project = ({ projects, project }) => {
  const projectList = projects || project || [];

  return (
    <div className="mt-4">
      <div className="px-2 py-4">
        <h2 className="py-4 font-bold text-2xl">Projects</h2>
        <div className="grid grid-cols-1 gap-6">
          {projectList.map((proj, idx) => {
            const live = proj.livelink || proj.liveLink;
            const hasLive = live && live.trim().length > 0;
            const hasGithub = proj.githublink && proj.githublink.trim().length > 0;

            return (
              <div
                key={idx}
                className="border border-gray-200 bg-white rounded-lg p-4 flex flex-col sm:flex-row gap-4"
              >
                {/* Left Side: Image container - full width on mobile, 1/3 on desktop */}
                <div className="w-full sm:w-1/3 sm:shrink-0 flex flex-col justify-between">
                  {proj.image && (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-40 sm:h-32 object-cover rounded-lg"
                    />
                  )}
                </div>

                {/* Right Side: Content container */}
                <div className="flex-1 min-w-0 flex flex-col pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-gray-300 sm:pl-4 justify-between">
                  <div>
                    <div className="flex flex-row items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{proj.title}</h3>
                      <div className="flex flex-wrap gap-3 shrink-0">
                        {hasLive && (
                          <a
                            href={live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 rounded-lg text-xs font-semibold text-gray-800 hover:text-black border border-gray-300 transition-colors"
                          >
                            Live Link
                          </a>
                        )}
                        {hasGithub && (
                          <a
                            href={proj.githublink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 rounded-lg text-xs font-semibold text-gray-800 hover:text-black border border-gray-300 transition-colors"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-sm mb-3">{proj.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack &&
                      proj.stack.map((tech, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-gray-100 text-gray-700 border border-gray-300 px-2 py-0.5 rounded-md text-[11px] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Project;
