import React from "react";

function InputPanel({
  length,
  width,
  lengthUnit,
  widthUnit,
  setLength,
  setWidth,
  setLengthUnit,
  setWidthUnit,
}) {
  return (
    <div className="input-panel">
      <h2>Dimensions</h2>
      <div className="input-group">
        <label>Length:</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <select
          value={lengthUnit}
          onChange={(e) => setLengthUnit(e.target.value)}
        >
          <option value="feet">Feet</option>
          <option value="yards">Yards</option>
        </select>
      </div>
      <div className="input-group">
        <label>Width:</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
        <select
          value={widthUnit}
          onChange={(e) => setWidthUnit(e.target.value)}
        >
          <option value="feet">Feet</option>
          <option value="yards">Yards</option>
        </select>
      </div>
    </div>
  );
}

export default InputPanel;
