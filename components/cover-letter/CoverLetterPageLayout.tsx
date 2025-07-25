import React from "react";

interface CoverLetterPageLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const CoverLetterPageLayout: React.FC<CoverLetterPageLayoutProps> = ({
  left,
  right,
}) => (
  <div className="min-h-screen bg-[#e8e8e8] py-2 flex flex-col">
    <div className="w-full h-full bg-white p-4 shadow-sm rounded-md flex flex-col flex-1">
      <div className="flex-1 grid grid-cols-12 gap-6 p-4">
        <div className="col-span-6">{left}</div>
        <div className="col-span-6">{right}</div>
      </div>
    </div>
  </div>
);
