import React from "react";

const Experience = ({ experience }) => {
  return (
    <div className="mt-4">
      <div className="px-2 py-4">
        <h2 className="py-4 font-bold text-2xl">Experience</h2>
        <div>
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl">{exp.company}</h3>
                  <p className="">{exp.role}</p>
                </div>
                <p className="font-semibold">{exp.duration}</p>
              </div>
              <p className="text-gray-600">{exp.details}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="bg-gray-200 px-2 py-1 rounded-lg text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
