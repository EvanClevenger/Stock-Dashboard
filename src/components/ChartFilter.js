import React from "react";

const ChartFilter = ({ text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-9 m-1 h-6 border-1 rounded-md flex items-center justify-center cursor-pointer ${
        active
          ? "bg-indigo-600 border-indigo-700 text-blue-100"
          : "border-indigo-300 text-indigo-300"
      }`}
    >
      {text}
    </button>
  );
};

export default ChartFilter;
