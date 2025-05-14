import React from "react";

const StatCard = ({ title, value, icon, change, unit, subValue, bgColor }) => (
  <div className={`${bgColor ?? "bg-white"} p-6 rounded-lg shadow-md`}>
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="text-acme-primary">{icon}</div>
    </div>
    <p className="mt-1 text-3xl font-semibold text-gray-900">
      {value ?? <span className="text-gray-400 text-xl">N/A</span>}
      {unit && <span className="text-xl ml-1">{unit}</span>}
    </p>
    {change && (
      <p
        className={`text-xs ${
          change.startsWith("-") ? "text-red-500" : "text-green-500"
        }`}
      >
        {change} from last
      </p>
    )}
    {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
  </div>
);

export default StatCard;
