import React, { useState, useCallback, useEffect } from "react";
import { ResumeDisplay } from "./resume/ResumeDisplay";
import { ResumeData } from "@/utils/types";

interface ResumePreviewProps {
  initialData: ResumeData;
  onChange?: (newData: ResumeData) => void;
}

export default function ResumePreview({
  initialData,
  onChange,
}: ResumePreviewProps) {
  const [data, setData] = useState<ResumeData>(initialData);
 
  useEffect(() => {
    setData(data);
  }, [initialData, data]);

  const handleDataChange = useCallback(
    (updater: (draft: ResumeData) => void) => {
      const updatedData = { ...data };
      updater(updatedData);
      setData(updatedData);
      if (onChange) {
        onChange(updatedData);
      }
    },
    [data, onChange]
  );

  return (
    <div>
      <ResumeDisplay data={data} handleDataChange={handleDataChange} />
    </div>
  );
}
