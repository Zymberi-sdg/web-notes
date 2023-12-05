// MonthSelector.js
import React from 'react';

const MonthSelector = ({ onMonthYearSelect }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const years = [2023, 2024]; // You can customize the list of years

  const handleMonthYearSelect = (event) => {
    const selectedValue = event.target.value;
    const [selectedMonth, selectedYear] = selectedValue.split('-');
    onMonthYearSelect(selectedMonth, selectedYear);
  };

  const options = [];
  years.forEach((year) => {
    months.forEach((month) => {
      options.push(
        <option key={`${month}-${year}`} value={`${month}-${year}`}>
          {month} {year}
        </option>
      );
    });
  });

  return (
    <div className="month-year-selector">
      <label className="selector-label" htmlFor="months-years">Select a month and year:</label>
      <select className="month-selector" id="months-years" onChange={handleMonthYearSelect}>
        {options}
      </select>
    </div>
  );
};

export default MonthSelector;
