import React, { useState } from "react";

const EditableText = ({ value, onChange, className = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(currentValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onChange(currentValue);
    }
  };

  return isEditing ? (
    <input
      type="text"
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
      className={`text-black  rounded bg-black px-2 py-1 ${className}`}
    />
  ) : (
    <div
      className={`cursor-pointer ${className}`}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {currentValue}
    </div>
  );
};

export default EditableText;
