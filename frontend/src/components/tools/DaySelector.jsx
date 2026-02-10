import React, { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const DaySelector = ({ value, setFieldValue, name }) => {
  // "value" prop'unu alıp, virgülle ayrılmış bir string'i array'e dönüştürüyoruz
  const [selectedDays, setSelectedDays] = useState(value ? value.split(", ") : []);
  
  const daysOfWeek = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];

  // Seçilen günü toggle (ekleme/çıkarma) işlemi yapıyoruz
  const toggleDay = (day) => {
    setSelectedDays((prevDays) => {
      const newSelectedDays = prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)  // Eğer gün daha önce seçildiyse, çıkarıyoruz
        : [...prevDays, day]; // Seçilen gün varsa, array'e ekliyoruz

      // Günlerin sırasına göre diziyi sıralıyoruz
      return newSelectedDays.sort((a, b) => {
        return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
      });
    });
  };

  useEffect(() => {
    setFieldValue(name, selectedDays.join(", "))
  }, [selectedDays, setFieldValue, name])

  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="p-2 border rounded-md w-64 overflow-hidden text-left text-ellipsis whitespace-nowrap">
            {selectedDays.length > 0
              ? selectedDays.join(", ")
              : "Gün Seçiniz"} 
          </MenuButton>
        </div>

        <MenuItems className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            {daysOfWeek.map((day) => (
              <MenuItem key={day}>
                {({ active, disabled }) => (
                  <button
                    onClick={() => toggleDay(day)} // Butona tıklanıldığında gün toggles
                    className={`${
                      active ? "bg-indigo-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full p-2 text-sm`}
                    disabled={disabled}
                  >
                    {selectedDays.includes(day) ? (
                      <span className="mr-2 text-indigo-500">✔</span>
                    ) : (
                      <span className="mr-2">✘</span>
                    )}
                    {day}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default DaySelector;
