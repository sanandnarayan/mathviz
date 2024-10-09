import React from "react";

function VisualizationArea({ length, width, lengthUnit, widthUnit }) {
  const lengthInFeet = lengthUnit === "yards" ? length * 3 : length;
  const widthInFeet = widthUnit === "yards" ? width * 3 : width;

  const rectangleStyle = {
    width: `${widthInFeet * 10}px`,
    height: `${lengthInFeet * 10}px`,
  };

  return (
    <div className="visualization-area">
      <h2>Visualization</h2>
      <div className="grid" style={rectangleStyle}>
        {/* Grid lines and interactive elements can be added here */}
      </div>
    </div>
  );
}

export default VisualizationArea;
