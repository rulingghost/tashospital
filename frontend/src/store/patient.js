import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    patients: [],
    patient: null,
}

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        addPatient: (state, action) => {
            const newPatient = {
                id: state.patients.length + 1, 
                patient_image: 'https://via.placeholder.com/40', 
                age: action.payload.age,
                patient_number: action.payload.patientCode,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email: action.payload.email || '', 
                mobile_phone1: action.payload.mobile_phone1 || '',
                city: action.payload.city || '', 
                national_id: action.payload.national_id || action.payload.pasaportNo || '',
                gender: action.payload.gender || '', 
                nationality: action.payload.nationality || '', 
                mother_name: action.payload.mother_name || '', 
                father_name: action.payload.father_name || '', 
                mobile_phone2: action.payload.mobile_phone2 || '', 
                instagram_username: action.payload.instagram_username || '', 
                patient_type: action.payload.patient_type || '', 
                country: action.payload.country || '', 
                address: action.payload.address || '', 
                date_of_birth: action.payload.date_of_birth || '', 
                place_of_birth: action.payload.place_of_birth || '', 
                seans_number: action.payload.session || '', 
                device_name: action.payload.device_name || '', 
                seans_days: action.payload.selectedDays || [], 
                occupation: action.payload.profession || '', 
                current_employer: action.payload.workplace || '', 
                marital_status: action.payload.marital_status || '', 
                referee: action.payload.referral || '', 
                existing_conditions: action.payload.currentDiseases || '', 
                medications: action.payload.medications || '', 
                past_surgeries: action.payload.operations || '', 
                allergies: action.payload.allergies || '', 
                complaints: action.payload.complaint || '', 
                children_count: action.payload.childrenCount || '', 
                smoker: action.payload.smoke || '', 
                consultation_date: action.payload.consultationDate || '', 
                sharing_permission: action.payload.sharingPermission || '', 
                post_surgery_address: action.payload.dateOfRepatriation || '', 
                institution_type: action.payload.organisationType || '', 
                applied_department: action.payload.department || '', 
                applied_operation: action.payload.procedure || '', 
            };
            state.patients = [
                newPatient,
                ...state.patients
            ];
        },
        setPatient: (state, action) => {
            state.patients = action.payload;
        },
        setPatientt: (state, action) => {
            state.patient = action.payload;
        },
        clearPatientt: (state) => {
            state.patient = null;
        }
    }
})

export const { addPatient, setPatient, setPatientt, clearPatientt } = patientsSlice.actions;
export default patientsSlice.reducer;
