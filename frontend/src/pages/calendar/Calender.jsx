import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMonth } from "../../util"; 
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import EventModal from "./EventModal";

function Calender() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const showEventModal = useSelector((state) => state.calendar.showEventModal);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-full flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Calender;
