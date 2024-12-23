import React from "react";

const Card = ({ children }) => {
  return (
    <div className="w-full h-full rounded-md relative p-4 sm:p-6 md:p-8 border-2 bg-white border-neutral-200 flex flex-col overflow-auto">
      {children}
    </div>
  );
};

export default Card;
