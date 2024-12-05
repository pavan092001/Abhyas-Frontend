import React, { useState,require } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import './CalendarStyles.css'; // Import custom styles
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS, tr } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { fetchQuestion } from '../redux/slices/questionSlice';
import { getFormattedDate } from '../utils/DateUtils';
// Setup localizer with date-fns
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      // Go back to the previous view
      toolbar.onNavigate('PREV');
    };
  
    const goToNext = () => {
      // Go to the next view
      toolbar.onNavigate('NEXT');
    };
  
    // const goToCurrent = () => {
    //   // Optional: this can be used to return to the current month/week/day
    //   toolbar.onNavigate('CURRENT');
    // };

    return (
        <div className="rbc-toolbar flex justify-center items-center">
        <button className="mx-8" onClick={goToBack}>Back</button>
        <span className="mx-8 text-center font-bold">{toolbar.label}</span>
        <button className="mx-8" onClick={goToNext}>Next</button>
      </div>
    );
}

const CalendarCom = () => {
  const [events, setEvents] = useState([]);
  const [loading,setLoading] = useState(false);

  const dispatch = useDispatch();
  const onDateSelect=(slotInfo)=>{
    console.log('Slot Info:',slotInfo); // Debug log
    console.log("dates ",slotInfo.start);
    setLoading(true);
    const res = dispatch(fetchQuestion(getFormattedDate(slotInfo.start)));
    if(res!=null)
      setLoading(false);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">Schedule</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={
            {
                month:true,
                week:false,
                day:false,
                agenda:false,
                today:false
            }
        }
        components={{
            toolbar: CustomToolbar, // Use the custom toolbar
          }}
          selectable
          onSelectSlot={onDateSelect}

      />
    </div>
  );
};

export default CalendarCom;
