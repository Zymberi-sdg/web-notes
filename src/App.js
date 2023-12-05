import React, { useState, useEffect } from 'react';
import './App.css';
import Calendar from './Calendar';
import MonthSelector from './MonthSelector';
import jsonData from './data.json'

function App() {
  const [projects, setProjects] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [fetchError, setFetchError] = useState(null);


  // const transformDocumentData = (data) => {
  //   const lines = data.split('\n');
  //   let result = {};
  //   let currentProject = '';
  //   let currentDate = '';

  //   for (let i = 0; i < lines.length; i++) {
  //       const line = lines[i].trim();

  //       if (line.startsWith('Attendees:') || line.startsWith('Date:')) {
  //           // Skip Attendees and Date lines
  //           continue;
  //       } else if (line === 'Notes:') {
  //           currentProject = ''; // Reset currentProject at Notes
  //       } else if (!line.startsWith('*')) {
  //           // New project found
  //           currentProject = line;
  //           result[currentProject] = {};
  //       } else if (currentProject !== '' && line.startsWith('*')) {
  //           // Notes for current project
  //           const nextLine = lines[i + 1].trim();
  //           if (!nextLine.startsWith('*') && !nextLine.startsWith('Notes:') && nextLine !== '') {
  //               // Line contains the date
  //               currentDate = nextLine;
  //               i++; // Move to the next line for Notes
  //               if (!result[currentProject][currentDate]) {
  //                   result[currentProject][currentDate] = [];
  //               }
  //           }
  //           const notes = [];
  //           while (i + 1 < lines.length && !lines[i + 1].startsWith('*') && lines[i + 1].trim() !== 'Notes:') {
  //               // Collect nested notes
  //               notes.push(lines[++i].trim());
  //           }
  //           result[currentProject][currentDate].push(notes);
  //       }
  //   }
  //   return result;
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/fetch-document');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.text();
  //       const transformedData = transformDocumentData(data);
  //       setProjects(transformedData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setFetchError(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []); // Run once on mount

  useEffect(() => {
    setProjects(jsonData);
  }, []);

  const handleProjectSelect = (projectName) => {
    setSelectedProject(projectName);
    setSelectedDate(null);
    const currentDate = new Date();
    setSelectedMonth((currentDate.getMonth() + 1).toString());
    setSelectedYear(currentDate.getFullYear().toString());
  };

  const handleDateSelect = (date, item) => {
    setSelectedDate(date);
  };

  const handleMonthYearSelect = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const renderNestedNotes = (notes) => {
    return (
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {Array.isArray(note) ? (
              renderNestedNotes(note)
            ) : (
              <p>{note}</p>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Project Management</h1>
      </header>
      <div className="project-container">
        <div className="project-list">
          <h2>Projects</h2>
          <ul>
            {Object.keys(projects).map((projectName) => (
              <li
                key={projectName}
                className="project-item"
                onClick={() => handleProjectSelect(projectName)}
              >
                {projectName}
              </li>
            ))}
          </ul>
        </div>
        <div className="project-details">
          {selectedProject && (
            <>
              <h2>{selectedProject}</h2>
              <MonthSelector onMonthYearSelect={handleMonthYearSelect} />
              <Calendar
                data={projects[selectedProject]}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onDateSelect={handleDateSelect}
              />
              {selectedDate && (
                <div>
                  <h3>Notes for {selectedDate}:</h3>
                  {renderNestedNotes(projects[selectedProject][selectedDate])}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
