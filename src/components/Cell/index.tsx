import { useState, useEffect, useCallback } from 'react';

export interface CellData {
  value?: number;
  operands?: string[];
  formula?: string;
  row: number;
  column: number;
}

export interface CellProps {
  sheetData: CellData[][];
  cellData: CellData;
  onChange: (cellData: CellData) => void;
}

export const Cell: React.FC<CellProps> = ({
  sheetData,
  cellData,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const calculateFormula = useCallback((operands: string[]) => {
    let sum = 0;

    operands.forEach((operand: string) => {
      const [rowIndex, columnIndex] = indexFromOperand(operand)
      sum += sheetData[rowIndex][columnIndex].value || 0;
    });

    return sum;
  }, [sheetData])

  const handleCellClick = () => {
    const {formula, value} = cellData;
    setIsEditing(true);
    if (formula) {
      setInputValue(formula);
    } else {
      setInputValue(value ? value.toString() : '');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      if (inputValue.startsWith('=')) {
        const operands = inputValue.slice(1).split('+');

        cellData.formula = inputValue
        cellData.operands = operands
        cellData.value = calculateFormula(operands);
      } else if (inputValue) {
        cellData.value = parseInt(inputValue);
      }

      onChange(cellData);
      setIsEditing(false);
    }
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsEditing(false);
  };

  const indexFromOperand = (coord: string) : [number, number] => {
    const [col, row] = coord.split('');
    const rowIndex = parseInt(row) - 1;
    const colIndex = col.charCodeAt(0) - 'A'.charCodeAt(0);

    return [rowIndex, colIndex];
  }

  useEffect(() => {
    if (cellData.operands) {
      cellData.value = calculateFormula(cellData.operands);
      onChange(cellData);
    }
  }, [sheetData, cellData, calculateFormula, onChange]);

  return (
    <td onClick={handleCellClick}>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          autoFocus
        />
      ): (
        cellData.value
      )}
    </td>
  )
}
