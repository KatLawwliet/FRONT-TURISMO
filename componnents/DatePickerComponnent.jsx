import React, { useState } from 'react';
import DatePickerService from '../Services/DatePickerService';

const DatePicker = ({ onSelect, onClose }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectingStartDate, setSelectingStartDate] = useState(true);

const handleDateSelect = (day) => {
  const selectedDate = new Date(currentYear, currentMonth, day);

  if (!selectedStartDate || selectedEndDate) {
    setSelectedStartDate(selectedDate);
    setSelectedEndDate(null);
  } else if (!selectedEndDate && selectedDate < selectedStartDate) {
    setSelectedStartDate(selectedDate);
  } else if (!selectedEndDate && selectedDate > selectedStartDate) {
    setSelectedEndDate(selectedDate);
  } else if (selectedEndDate && selectedDate < selectedStartDate) {
    setSelectedStartDate(selectedDate);
    setSelectedEndDate(null);
  } else if (selectedEndDate && selectedDate > selectedStartDate) {
    setSelectedEndDate(selectedDate);
  }

  console.log("Día seleccionado:", day);
  console.log("Fecha de inicio seleccionada:", selectedStartDate);
  console.log("Fecha final seleccionada:", selectedEndDate);
};

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      if (newMonth === 11) setCurrentYear(currentYear - 1);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      if (newMonth === 0) setCurrentYear(currentYear + 1);
      return newMonth;
    });
  };

  const handleCloseClick = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    onClose();
  };

  const daysOfMonth = DatePickerService.getDaysOfMonth(currentYear, currentMonth);

  return (
    <div style={styles.datePickerContainer}>
      <div style={styles.header}>
        <button style={styles.navigationButton} onClick={handlePrevMonth}>Mes Anterior</button>
        <h3 style={styles.monthName}>{DatePickerService.getMonthName(currentMonth)}</h3>
        <button style={styles.navigationButton} onClick={handleNextMonth}>Mes Siguiente</button>
      </div>
      <div style={styles.daysContainer}>
        {daysOfMonth.map(day => (
          <button
            key={day}
            style={{
              ...styles.dayButton,
              backgroundColor:
                (selectedStartDate && !selectedEndDate && day === selectedStartDate.getDate()) ||
                (selectedStartDate && selectedEndDate && day >= selectedStartDate.getDate() && day <= selectedEndDate.getDate()) ? '#028035' :
                day === today.getDate() ? '#ccc' :
                'transparent',
              color: day === today.getDate() ? 'white' : '#000'
            }}
            onClick={() => handleDateSelect(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div>
        <button style={styles.closeButton} onClick={handleCloseClick}>Cerrar</button>
      </div>
    </div>
  );
};

const styles = {
  datePickerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    width: '100%',
  },
  navigationButton: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  monthName: {
    margin: 0,
  },
  daysContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  dayButton: {
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '10px',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',
  },
  closeButton: {
    backgroundColor: '#B32100',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 15px',
    color: 'white',
    cursor: 'pointer',
  },
};

export default DatePicker;



