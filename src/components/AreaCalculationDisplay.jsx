import React from "react";

function AreaCalculationDisplay({ length, width, lengthUnit, widthUnit }) {
  const lengthInFeet = lengthUnit === "yards" ? length * 3 : length;
  const widthInFeet = widthUnit === "yards" ? width * 3 : width;

  const areaInSquareFeet = lengthInFeet * widthInFeet;
  const areaInSquareYards = areaInSquareFeet / 9;

  return (
    <div className="area-calculation-display">
      <h2>Area Calculation</h2>
      <p>
        Area in Square Feet: {lengthInFeet} ft × {widthInFeet} ft ={" "}
        {areaInSquareFeet} ft²
      </p>
      <p>
        Area in Square Yards: {areaInSquareFeet} ft² ÷ 9 ={" "}
        {areaInSquareYards.toFixed(2)} yd²
      </p>
    </div>
  );
}

export default AreaCalculationDisplay;
