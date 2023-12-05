// Calendar.js
import React from 'react';

const Calendar = ({ data, selectedMonth, selectedYear, selectedDate, onDateSelect }) => {
  const dates = Object.keys(data);

  const filteredDates = dates.filter((date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString('default', { month: 'long' });

    return year.toString() === selectedYear && month === selectedMonth;
  });

  return (
    <div className="horizontal-calendar">
      {filteredDates.map((date) => (
        <div
          key={date}
          className={`calendar-day ${date === selectedDate ? 'selected-day' : ''}`}
          onClick={() => onDateSelect(date)}
        >
          {date}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
