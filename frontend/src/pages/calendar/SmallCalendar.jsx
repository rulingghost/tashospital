import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSmallCalendarMonth, setDaySelected, setLabels, updateFilteredEvents } from "../../store/calendarSlice";
import dayjs from "dayjs";
import { getMonth } from "../../util";
import { useTranslation } from "react-i18next";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const savedEvents = useSelector((state) => state.calendar.savedEvents);
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  // Redux'tan daySelected'i çek ve dayjs nesnesine dönüştür
  const daySelected = dayjs(useSelector((state) => state.calendar.daySelected));

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    const labels = [...new Set(savedEvents.map((evt) => evt.label))].map(
      (label) => ({ label, checked: true })
    );
    dispatch(setLabels(labels));
    dispatch(updateFilteredEvents()); // labels güncellendiğinde filtreleme işlemi de güncellenir
  }, [savedEvents, dispatch]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  function getDayClass(day) {
    const format = "DD-MM-YYYY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected.format(format); // daySelected'i dayjs nesnesi olarak kullanın
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }

  // Ay adını ve yılı ayrı ayrı çevirelim
  const monthName = t(dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM"));
  const year = dayjs(new Date(dayjs().year(), currentMonthIdx)).format("YYYY");
  const formattedDate = `${monthName} ${year}`;

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {formattedDate} {/* Çevrilmiş ay adı ve yıl */}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {t(day.format("dd").charAt(0))} {/* Gün kısaltmalarını çevir */}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  dispatch(setSmallCalendarMonth(currentMonthIdx));
                  dispatch(setDaySelected(day.toISOString())); // dayjs'i serileştirilebilir formata dönüştür
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
