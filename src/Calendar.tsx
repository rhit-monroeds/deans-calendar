import React from 'react';

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
  const getBusinessWeek = () => {
    const today = new Date();
    const currentDay = today.getDay();
    
    let monday = new Date(today);
    
    if (currentDay === 0 || currentDay === 6) {
      const daysUntilNextMonday = currentDay === 0 ? 1 : 2;
      monday.setDate(today.getDate() + daysUntilNextMonday);
    } else {
      monday.setDate(today.getDate() - (currentDay - 1));
    }
    
    const businessDays = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      businessDays.push(day);
    }
    return businessDays;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const businessWeek = getBusinessWeek();

  return (
    <div className="calendar">
      <h1>Dean's Calendar</h1>
      <div className="week-container">
        {businessWeek.map((date, index) => (
          <div 
            key={index} 
            className={`day-card ${isToday(date) ? 'today' : ''}`}
          >
            <div className="day-header">
              <h2>{date.toLocaleDateString('en-US', { weekday: 'short' })}</h2>
              <span className="date">{date.getDate()}</span>
            </div>
            <div className="day-content">
              <p className="full-date">{formatDate(date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
