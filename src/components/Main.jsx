import React from "react";
import Icon from "./Icon";

const Main = ({
  name,
  tagline,
  resumeUrl = "/Ayush_Patwal-Resume.pdf",
  resumeIcon = "Download"
}) => {
  return (
    <section className="mt-4 sm:mt-8 py-4">
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        {/* Left column: Text & Resume CTA */}
        <div className="flex-1 space-y-3 sm:space-y-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {name}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
            {tagline}
          </p>

          <div className="pt-2">
            <a
              href={resumeUrl}
              download="Ayush_Patwal-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-medium px-5 py-2.5 rounded-lg shadow-xs transition-all duration-200 text-sm cursor-pointer"
            >
              <Icon name={resumeIcon} className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Right column: Main Profile Image */}
        <div className="shrink-0 self-start md:self-auto">
          <img
            src="/main.png"
            alt={name || "Ayush Patwal"}
            className="w-20 h-20 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-lg object-cover border-2 mr-5 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Main;
