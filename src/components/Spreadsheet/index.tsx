import {Cell, CellData} from "../Cell";
import { useState } from 'react';
import './style.css';

const Spreadsheet: React.FC = () => {
  const COLUMNS = 15;
  const ROWS = 15;

  const [sheetData, setSheetData] = useState<CellData[][]>(
    [...Array(ROWS)].map((_, r) => {
      return [...Array(COLUMNS)].map((_, c)=> {
        return {row: r, column: c};
      })
    })
  );

  const columnHeaders: JSX.Element[] = [];
  for (let i = 0; i < COLUMNS; i++) {
    columnHeaders.push(<td>{String.fromCharCode('A'.charCodeAt(0) + i)}</td>)
  }

  const handleCellChange = (cellData: CellData) => {
    const {row, column} = cellData;
    setSheetData((prevSheetData) => {
      const newSheetData = [...prevSheetData];
      newSheetData[row][column] = cellData;
      return newSheetData;
    })
  }

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          {columnHeaders}
        </tr>
      </thead>

      <tbody>
        {sheetData.map((rows, r) => {
          return (
            <tr key={r}>
              <td>{r + 1}</td>
              {rows.map((cell, c) => {
                return (
                  <Cell
                    key={c}
                    onChange={handleCellChange}
                    sheetData={sheetData}
                    cellData={sheetData[r][c]}
                  />
                )
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default Spreadsheet;
