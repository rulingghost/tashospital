import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    medicines: [],
}

const medicinesSlice = createSlice({
    name: 'medicines',
    initialState,
    reducers: {     
        addMedicine: (state, action) => {
            state.medicines.push(action.payload);
        },   
        setMedicines: (state, action) => { 
            state.medicines = action.payload;
        },
        clearMedicines: (state) => { 
            state.medicines = []; 
        }
    }
})

export const { setMedicines, clearMedicines, addMedicine } = medicinesSlice.actions;
export default medicinesSlice.reducer;
