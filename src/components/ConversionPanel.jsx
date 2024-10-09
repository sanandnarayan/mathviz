import React from "react";

function ConversionPanel({
  length,
  width,
  lengthUnit,
  widthUnit,
  setLength,
  setWidth,
  setLengthUnit,
  setWidthUnit,
}) {
  const convertLength = () => {
    if (lengthUnit === "feet") {
      setLength(length / 3);
      setLengthUnit("yards");
    } else {
      setLength(length * 3);
      setLengthUnit("feet");
    }
  };

  const convertWidth = () => {
    if (widthUnit === "feet") {
      setWidth(width / 3);
      setWidthUnit("yards");
    } else {
      setWidth(width * 3);
      setWidthUnit("feet");
    }
  };

  return (
    <div className="conversion-panel">
      <h2>Conversions</h2>
      <div className="conversion-group">
        <button onClick={convertLength}>Convert Length</button>
        <button onClick={convertWidth}>Convert Width</button>
      </div>
      <p>1 yard = 3 feet</p>
      <p>1 square yard = 9 square feet</p>
    </div>
  );
}

export default ConversionPanel;
