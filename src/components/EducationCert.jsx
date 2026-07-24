import React from "react";
import Icon from "./Icon";

const EducationCert = ({ education = [], certifications = [] }) => {
  return (
    <div className="mt-12 mb-12 px-2 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Education */}
        <div className="border border-gray-200/80 bg-white rounded-lg p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-gray-100">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-800">
                <Icon name="GraduationCap" className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 tracking-tight">
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative pl-4 border-l-2 border-gray-200 hover:border-gray-900 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {edu.icon && <Icon name={edu.icon} className="w-4 h-4 text-gray-600 shrink-0" />}
                      <h4 className="font-semibold text-base text-gray-900">
                        {edu.degree}
                      </h4>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full shrink-0">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{edu.school}</p>
                  {edu.score && (
                    <div className="mt-2 inline-block">
                      <span className="text-xs font-semibold text-gray-700 bg-gray-100 border border-gray-200/80 px-2 py-0.5 rounded-md">
                        Score: {edu.score}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Certifications */}
        <div className="border border-gray-200/80 bg-white rounded-lg p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-gray-100">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-800">
                <Icon name="Award" className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 tracking-tight">
                Certifications
              </h3>
            </div>

            <div className="space-y-3.5">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-gray-100 bg-gray-100 hover:border-gray-200 transition-all duration-200 flex justify-between items-center gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <h4 className="font-medium text-sm text-gray-800">
                      {cert.title}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200/80 px-2.5 py-1 rounded-md shrink-0 shadow-2xs">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCert;
