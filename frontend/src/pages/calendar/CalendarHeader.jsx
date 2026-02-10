import dayjs from "dayjs";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMonthIndex } from "../../store/calendarSlice"; 
import { useTranslation } from "react-i18next"; 

export default function CalendarHeader() {
  const dispatch = useDispatch();
  const monthIndex = useSelector((state) => state.calendar.monthIndex);
  const { t, i18n } = useTranslation();

  function handlePrevMonth() {
    dispatch(setMonthIndex(monthIndex - 1));
  }

  function handleNextMonth() {
    dispatch(setMonthIndex(monthIndex + 1));
  }

  function handleReset() {
    dispatch(
      setMonthIndex(
        monthIndex === dayjs().month()
          ? monthIndex + Math.random()
          : dayjs().month()
      )
    );
  }

  // Gün ve ay isimlerini elle çeviriyoruz
  const monthName = t(dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM")); // Ay ismini çevirir
  const formattedDate = `${monthName} ${dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY")}`;

  return (
    <header className="px-4 py-2 flex items-center">
      <h1 className="mr-10 text-xl text-gray-500 font-bold">
        {t('calendar')}
      </h1>
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
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {formattedDate}
      </h2>
    </header>
  );
}
