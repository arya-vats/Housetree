import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [layout, setLayout] = useState([]);
  const [rowCount, setRowCount] = useState();
  const [colCount, setColCount] = useState();

  const createLayout = () => {
    if(rowCount && colCount > 0) {
    const newLayout = Array(rowCount)
      .fill()
      .map(() => Array(colCount).fill(""));

    setLayout(newLayout);
    } else {
      alert("Oops! Did you forget to select rows or columns?")
    }
  };

  const assignService = (row, col, service) => {
    //create copy to avoid directly modifying the layout array
    const updatedLayout = [...layout];
    updatedLayout[row][col] = service;
    setLayout(updatedLayout);
  };

  const assignHouse = (row, col, label) => {
    const updatedLayout = [...layout];
    updatedLayout[row][col] = `House (${label})`;
    setLayout(updatedLayout);
  };

  const calculateScore = (row, col) => {
    let score = 0;

    // Check adjacent plots for services
    if (row > 0 && layout[row - 1][col] !== "") score++;
    if (row < rowCount - 1 && layout[row + 1][col] !== "") score++;
    if (col > 0 && layout[row][col - 1] !== "") score++;
    if (col < colCount - 1 && layout[row][col + 1] !== "") score++;

    return score;
  };

  const recommendHouse = () => {
    let maxScore = -1;
    let bestHouse = "";

    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        if (layout[row][col].startsWith("House")) {
          const score = calculateScore(row, col);
          if (score > maxScore) {
            maxScore = score;
            bestHouse = layout[row][col];
          }
        }
      }
    }

    if (bestHouse === "") {
      alert("Oops! No houses found in the layout :(");
    } else {
      alert(`Best House: ${bestHouse}`);
    }
  };

  return (
    <div className="App">
      <h2>Create Housing Layout</h2>

      <div className="input-row">
        <label>Rows:</label>
        <input
          type="number"
          value={rowCount}
          placeholder="Please enter number"
          onChange={(e) => setRowCount(parseInt(e.target.value))}
        />
      </div>

      <div className="input-row">
        <label>Columns:</label>
        <input
          type="number"
          value={colCount}
          placeholder="Please enter number"
          onChange={(e) => setColCount(parseInt(e.target.value))}
        />
      </div>
      <button className="recommend-button" onClick={createLayout}>Create Layout</button>

      <h2>Assign Services and Houses</h2>

      <div className="layout">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="cell">
                <select
                  value={cell}
                  onChange={(e) =>
                    assignService(rowIndex, colIndex, e.target.value)
                  }
                >
                  <option value="">Select Service</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Gym">Gym</option>
                  <option value="Hospital">Hospital</option>
                </select>

                {cell.startsWith("House") && <span>{cell}</span>}

                {!cell && (
                  <button
                    onClick={() => {
                      const label = prompt("Enter House Label:");
                      assignHouse(rowIndex, colIndex, label);
                    }}
                  >
                    Add House
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="recommend-button" onClick={recommendHouse}>Recommend House</button>
    </div>
  );

  //Apart from this there could be many more approaches that could have been used for this. I also
  //did not focus much on beautification, rather I focused on creating the logic.
}
