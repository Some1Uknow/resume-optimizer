import React, { useState } from "react";

interface EditableProps {
  initialValue: string;
  onSave: (newValue: string) => void;
}

export const Editable = ({ initialValue, onSave }: EditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(initialValue);

  const handleSave = () => {
    onSave(currentValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleSave}
      />
    );
  }

  return (
    <div onClick={() => setIsEditing(true)}>{initialValue}</div>
  );
};