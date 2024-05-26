import React from "react";

function Tag({ children }: { children: any }) {
  return (
    <div className="p-1 text-xs md:text-sm border rounded w-fit">
      <p>{children}</p>
    </div>
  );
}

export default Tag;
