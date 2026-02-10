import React from "react";
import plusImg from "../../assets/plus.svg";
import { useDispatch } from "react-redux";
import { setShowEventModal } from "../../store/calendarSlice"; // slice yolunuza dikkat edin
import { useTranslation } from "react-i18next"; 

export default function CreateEventButton() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <button
      onClick={() => dispatch(setShowEventModal(true))}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
    >
      <img src={plusImg} alt="create_event" className="w-7 h-7" />
      <span className="pl-3 pr-7">{t('create')}</span>
    </button>
  );
}
