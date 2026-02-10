import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateLabel } from "../../store/calendarSlice";
import { useTranslation } from "react-i18next";

export default function Labels() {
  const dispatch = useDispatch();
  const labels = useSelector((state) => state.calendar.labels);
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">{t('Label')}</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              dispatch(updateLabel({ label: lbl, checked: !checked }))
            }
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          {/* Çevrilmiş etiket adı ve renklendirme */}
          <span className={`ml-2 text-${lbl}-700 capitalize`}>
            {t(lbl)}
          </span>
        </label>
      ))}
    </React.Fragment>
  );
}
