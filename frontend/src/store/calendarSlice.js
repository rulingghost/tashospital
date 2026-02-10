import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  monthIndex: dayjs().month(),
  smallCalendarMonth: null,
  daySelected: null,
  showEventModal: false,
  selectedEvent: null,
  labels: [],
  savedEvents: JSON.parse(localStorage.getItem("savedEvents")) || [],
  filteredEvents: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setMonthIndex: (state, action) => {
      state.monthIndex = action.payload;
    },
    setSmallCalendarMonth: (state, action) => {
      state.smallCalendarMonth = action.payload;
    },
    setDaySelected: (state, action) => {
      state.daySelected = action.payload;
    },
    setShowEventModal: (state, action) => {
      state.showEventModal = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    updateLabel: (state, action) => {
      state.labels = state.labels.map((lbl) =>
        lbl.label === action.payload.label ? action.payload : lbl
      );
      calendarSlice.caseReducers.updateFilteredEvents(state); // updateFilteredEvents çağrıldı
    },
    setLabels: (state, action) => {
      state.labels = action.payload;
      calendarSlice.caseReducers.updateFilteredEvents(state); // updateFilteredEvents çağrıldı
    },
    pushEvent: (state, action) => {    
      state.savedEvents.push(action.payload);      
      localStorage.setItem("savedEvents", JSON.stringify(state.savedEvents));    
      calendarSlice.caseReducers.updateFilteredEvents(state);     
      console.log(state.filteredEvents);      
    },
    updateEvent: (state, action) => {
      state.savedEvents = state.savedEvents.map((evt) =>
        evt.id === action.payload.id ? action.payload : evt
      );
      localStorage.setItem("savedEvents", JSON.stringify(state.savedEvents));
      calendarSlice.caseReducers.updateFilteredEvents(state); // updateFilteredEvents çağrıldı     
    },
    deleteEvent: (state, action) => {
      state.savedEvents = state.savedEvents.filter(
        (evt) => evt.id !== action.payload.id
      );
      localStorage.setItem("savedEvents", JSON.stringify(state.savedEvents));
      calendarSlice.caseReducers.updateFilteredEvents(state); // updateFilteredEvents çağrıldı
    },
    updateFilteredEvents: (state) => {
      const checkedLabels = state.labels
        .filter((lbl) => lbl.checked) // Sadece checked olan etiketleri al
        .map((lbl) => lbl.label); // Bu etiketlerin label'larını topla
    
      state.filteredEvents = state.savedEvents.filter((evt) =>
        checkedLabels.includes(evt.label) // Sadece checked label'larına sahip etkinlikleri ekle
      );
    },
  },
});

export const {
  setMonthIndex,
  setSmallCalendarMonth,
  setDaySelected,
  setShowEventModal,
  setSelectedEvent,
  updateLabel,
  setLabels,
  pushEvent,
  updateEvent,
  deleteEvent,
  updateFilteredEvents,
} = calendarSlice.actions;

export default calendarSlice.reducer;
