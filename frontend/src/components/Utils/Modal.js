import { useSelector } from "react-redux";
import store from "../../store";
import { append, destroy, destroyAll } from "../../store/modal";

export const useModals = () => useSelector(state => state.modal.modals)
export const createModal = (name, data = false, isEdit = false, patientID) => store.dispatch(append({name, data, isEdit, patientID}))
export const destroyModal = () => store.dispatch(destroy())
export const destroyAllModal = () => store.dispatch(destroyAll())