import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDaySelected, setShowEventModal, setSelectedEvent } from "../../store/calendarSlice";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function Day({ day, rowIdx }) {
  const dispatch = useDispatch();
  const filteredEvents = useSelector((state) => state.calendar.filteredEvents);
  const [dayEvents, setDayEvents] = useState([]);
  const { t } = useTranslation();

  // Her gün için ilgili etkinlikleri filtrele
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YYYY") === day.format("DD-MM-YYYY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {t(day.format("ddd").toUpperCase())} {/* Gün adı çevirisi */}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          dispatch(setDaySelected(day.toISOString()));
          dispatch(setShowEventModal(true));
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => dispatch(setSelectedEvent(evt))}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {t(evt.title)} {/* Etkinlik başlığı çevirisi */}
          </div>
        ))}
      </div>
    </div>
  );
}
