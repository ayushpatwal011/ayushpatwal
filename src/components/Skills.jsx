import React from "react";

const Skills = ({ skills }) => {
  return (
    <div className="mt-16">
      <div className="px-2 py-4 bg-gray-100 rounded-lg">
        <h2 className="mb-4 font-bold text-xl">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <p
              className="border border-gray-300 bg-gray-200 rounded-lg text-sm font-semibold px-3 py-1"
              key={index}
            >
              {skill}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
