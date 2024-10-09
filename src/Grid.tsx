import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface GridProps {
  lengthFeet: number;
  widthFeet: number;
  lengthYards: number;
  widthYards: number;
}

interface GridWrapperProps {
  width: number;
}
 
function Grid({ lengthFeet, widthFeet, lengthYards, widthYards }: GridProps) {
  const totalSquaresFeet = Math.ceil(lengthFeet) * Math.ceil(widthFeet);
  const totalSquaresYards = Math.ceil(lengthYards) * Math.ceil(widthYards);

  const squaresFeet = [];
  for (let i = 0; i < totalSquaresFeet; i++) {
    squaresFeet.push(<SquareFeet key={`sf-${i}`} data-tip="1 sq ft" />);
  }

  const squaresYards = [];
  for (let i = 0; i < totalSquaresYards; i++) {
    squaresYards.push(<SquareYard key={`sy-${i}`} data-tip="1 sq yd" />);
  }

  return (
    <GridContainer>
      <Section>
        <h2>Area in Square Feet</h2>
        <GridWrapper width={Math.ceil(widthFeet) * 20}>
          {squaresFeet}
        </GridWrapper>
      </Section>
      <Section>
        <h2>Area in Square Yards</h2>
        <GridWrapper width={Math.ceil(widthYards) * 60}>
          {squaresYards}
        </GridWrapper>
      </Section>
      <ReactTooltip />
    </GridContainer>
  );
}

export default Grid;

const GridContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Section = styled.div`
  text-align: center;
`;

const GridWrapper = styled.div<GridWrapperProps>`
  display: flex;
  flex-wrap: wrap;
  width: ${(props) => props.width}px;
  margin: 0 auto;
`;

const SquareFeet = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffcccb;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const SquareYard = styled.div`
  width: 60px;
  height: 60px;
  background-color: #add8e6;
  border: 1px solid #333;
  box-sizing: border-box;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 19px;
    left: 19px;
    width: 22px;
    height: 22px;
    border: 1px dashed #333;
  }
`;
