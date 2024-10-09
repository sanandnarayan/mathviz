import React from "react";

function ConceptNavigationBar({ currentConcept, setCurrentConcept }) {
  const concepts = [
    "Calculating Area",
    "Converting Feet to Yards",
    "Square Units Relation",
    "Converting Square Units",
    "Linear vs Area Units",
    "Visualizing Units",
    "Using Multiplication & Division",
  ];

  return (
    <div className="concept-navigation-bar">
      {concepts.map((concept, index) => (
        <button
          key={index}
          className={currentConcept === index + 1 ? "active" : ""}
          onClick={() => setCurrentConcept(index + 1)}
        >
          {index + 1}. {concept}
        </button>
      ))}
    </div>
  );
}

export default ConceptNavigationBar;
