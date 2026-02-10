import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMonthIndex,
  setSmallCalendarMonth,
  setDaySelected,
  setShowEventModal,
  setSelectedEvent,
  setLabels,
  updateLabel,
  pushEvent,
  updateEvent,
  deleteEvent,
  setFilteredEvents,
} from "./calendarSlice";
import dayjs from "dayjs";

export default function ContextWrapper(props) {
  const dispatch = useDispatch(); // Redux dispatch fonksiyonunu kullanmak için
  const {
    monthIndex,
    smallCalendarMonth,
    daySelected,
    showEventModal,
    selectedEvent,
    labels,
    savedEvents,
    filteredEvents,
  } = useSelector((state) => state.calendar); // Redux store'dan state'i çekmek için

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    dispatch(
      setLabels(
        [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
          const currentLabel = labels.find((lbl) => lbl.label === label);
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        })
      )
    );
  }, [savedEvents, labels, dispatch]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      dispatch(setMonthIndex(smallCalendarMonth));
    }
  }, [smallCalendarMonth, dispatch]);

  useEffect(() => {
    if (!showEventModal) {
      dispatch(setSelectedEvent(null));
    }
  }, [showEventModal, dispatch]);

  return <>{props.children}</>; // GlobalContext.Provider artık yok çünkü Redux store kullanılıyor
}
