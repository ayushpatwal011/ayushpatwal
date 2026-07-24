import React from "react";
import * as Icons from "lucide-react";

const Icon = ({ name, className = "w-4 h-4", ...props }) => {
  if (!name) return null;
  const LucideIcon = Icons[name] || Icons.HelpCircle;
  return <LucideIcon className={className} {...props} />;
};

export default Icon;
