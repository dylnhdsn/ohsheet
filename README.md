```
  ________  ___  ___  ________  ___  ___  _______   _______  _________
 |\   __  \|\  \|\  \|\   ____\|\  \|\  \|\  ___ \ |\  ___ \|\___   ___\
 \ \  \|\  \ \  \\\  \ \  \___|\ \  \\\  \ \   __/|\ \   __/\|___ \  \_|
  \ \  \\\  \ \   __  \ \_____  \ \   __  \ \  \_|/_\ \  \_|/__  \ \  \
   \ \  \\\  \ \  \ \  \|____|\  \ \  \ \  \ \  \_|\ \ \  \_|\ \  \ \  \
    \ \_______\ \__\ \__\____\_\  \ \__\ \__\ \_______\ \_______\  \ \__\
     \|_______|\|__|\|__|\_________\|__|\|__|\|_______|\|_______|   \|__|
                        \|_________|
```

This is a spreadsheet application built with React that implements the following features:

- The spreadsheet has 15 rows and 15 columns.
- Each cell in the spreadsheet can accept input in the form of a numeric string or a formula string.
- Numeric strings will only have integers, and formula strings will only include references to other cells in the form of cell addresses, such as "A1", and the "+" operator.
- When a formula cell is rendered, it shows the sum of its operands.
- The application updates the formula cells reactively when their operands change.

## Technical Decisions

The interesting pieces of logic in this solution are in the `Cell` component. The component uses `useState`, `useEffect`, and `useCallback` hooks to manage its state and update the cell's data.

The `calculateFormula` function uses `sheetData` state to calculate the sum of a cell's operands when its value changes. The function is memoized with `useCallback` to prevent unnecessary re-renders.

The `handleInputKeyDown` function is responsible for updating the cell's data when the user presses `Enter` or `Escape`. The function parses the input value and updates the cell's value or formula based on the input string.

The `useEffect` hook is used to update the cell's value whenever its operands change. The hook watches the `sheetData`, `cellData`, and `calculateFormula` dependencies and updates the cell's data using the `onChange` function when the value changes.

## Additional Features and Enhancements

If given additional time and the above mentioned limitations were removed, some additional features and enhancements that could be implemented include:

- Support for more complex formulas with other mathematical operators like `-`, `*`, `/`, and `SUM`.
- Support for range selection in formulas, such as `=SUM(A1:A3)`.
- Error handling for invalid input and circular references.
- Support for adding and removing rows and columns dynamically.
- Support for importing and exporting spreadsheet data in various formats.

## Execution Instructions

To run the spreadsheet application, follow these steps:

1. Clone the repository to your local machine.
2. Open the project directory in your terminal and run `npm install` to install the dependencies.
3. Run `npm start` to start the application.
4. Open your browser and navigate to `http://localhost:3000` to use the application.

