import styled from "styled-components";

interface CalculationPanelProps {
  lengthFeet: number;
  widthFeet: number;
  areaFeet: number;
  areaYards: number;
}
function CalculationPanel({
  lengthFeet,
  widthFeet,
  areaFeet,
  areaYards,
}: CalculationPanelProps) {
  return (
    <Panel>
      <h2>Calculations</h2>
      <Calculation>
        <strong>Area in Square Feet:</strong> {lengthFeet} ft × {widthFeet} ft ={" "}
        {areaFeet.toFixed(2)} ft²
      </Calculation>
      <Calculation>
        <strong>Conversion Factor Squared:</strong> (1 yd = 3 ft) ⇒ (1 yd² = 9
        ft²)
      </Calculation>
      <Calculation>
        <strong>Area in Square Yards:</strong> {areaFeet.toFixed(2)} ft² ÷ 9
        ft²/yd² = {areaYards.toFixed(2)} yd²
      </Calculation>
    </Panel>
  );
}

export default CalculationPanel;

const Panel = styled.div`
  margin: 0 auto;
  width: 80%;
  text-align: left;
`;

const Calculation = styled.p`
  font-size: 1.1em;
  margin: 10px 0;
`;
