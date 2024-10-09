import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Grid from './Grid.tsx';
import CalculationPanel from './CalculationPanel.tsx';
import Clue from './components/Clue';

function App() {
  const [lengthFeet, setLengthFeet] = useState(9);
  const [widthFeet, setWidthFeet] = useState(12);

  const lengthYards = lengthFeet / 3;
  const widthYards = widthFeet / 3;

  const areaFeet = lengthFeet * widthFeet;
  const areaYards = (lengthFeet / 3) * (widthFeet / 3);

  return (
    <Router>
      <AppContainer>
        <nav>
          <NavList>
            <NavItem>
              <NavLink to="/">Math Clues</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/area-conversion">Area Conversion</NavLink>
            </NavItem>
          </NavList>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <Clue />
            </>
          } />
          <Route path="/area-conversion" element={
            <>
              <Header>Area Conversion Visualization</Header>
              <InputContainer>
                <DimensionInput>
                  <label>Length (feet):</label>
                  <input
                    type="number"
                    value={lengthFeet}
                    onChange={(e) => setLengthFeet(Number(e.target.value))}
                  />
                </DimensionInput>
                <DimensionInput>
                  <label>Width (feet):</label>
                  <input
                    type="number"
                    value={widthFeet}
                    onChange={(e) => setWidthFeet(Number(e.target.value))}
                  />
                </DimensionInput>
              </InputContainer>
              <Grid
                lengthFeet={lengthFeet}
                widthFeet={widthFeet}
                lengthYards={lengthYards}
                widthYards={widthYards}
              />
              <CalculationPanel
                lengthFeet={lengthFeet}
                widthFeet={widthFeet}
                areaFeet={areaFeet}
                areaYards={areaYards}
              />
            </>
          } />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`;

const Header = styled.h1`
  margin-bottom: 20px;
  color: #4a4a4a;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const NavItem = styled.li`
  margin: 0 15px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #4a4a4a;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f8ff;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const DimensionInput = styled.div`
  margin: 0 10px;
  label {
    margin-right: 5px;
  }
  input {
    width: 60px;
    padding: 5px;
    border: 1px solid #7cb9e8;
    border-radius: 5px;
  }
`;
