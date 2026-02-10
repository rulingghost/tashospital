import { elements } from "chart.js";
import BodroAddModal from "./components/modals/BodroAddModal";
import ExpenseModal from "./components/modals/ExpenseModal";
import InvoiceModal from "./components/modals/InvoiceModal";
import PatientAddModal from "./components/modals/PatientAddModal";
import ProductAddModal from "./components/modals/ProductAddModal";
import StockAddModal from "./components/modals/StockAddModal";
import StockOrderModal from "./components/modals/StockOrderModal";
import WorkerCheck from "./components/modals/WorkerCheck";
import WorkerQuest from "./components/modals/WorkerQuest";
import YabancıModal from "./components/modals/YabancıModal";
import WorkerAddModal from "./components/modals/WorkerAddModal";
import WorkerLeavesAddModal from "./components/modals/WorkerLeavesAddModal";
import WorkerHoursAddModal from "./components/modals/WorkerHoursAddModal";
import ToothNotesAddModal from "./components/modals/ToothNotesAddModal";
import TransferProductModal from "./components/modals/TransferProductModal";
import WarehouseAddModal from "./components/modals/WarehouseAddModal";
import ShowPhotosModal from "./components/modals/ShowPhotosModal";
import PhotooAddModal from "./components/modals/PhotooAddModal";
import PatientFileAddModal from "./components/modals/PatientFileAddModal";
import InvoiceDetailModal from "./components/modals/InvoiceDetailModal";
import ProformaAddModal from "./components/modals/ProformaAddModal";

const modals = [
    {
        name: 'patient',
        element: PatientAddModal
    },
    {
        name: "stock",
        element: StockAddModal
    },
    {
        name: "product",
        element: ProductAddModal
    },
    {
        name: "worker-quest",
        element: WorkerQuest
    },
    {
        name: "worker-check",
        element: WorkerCheck
    },
    {
        name: "invoice-modal",
        element: InvoiceModal
    },
    {
        name: "bodro-modal",
        element: BodroAddModal
    },
    {
        name: "yabancı-modal",
        element: YabancıModal
    },
    {
        name: "stockOrder",
        element: StockOrderModal
    },
    {
        name: "workerAdd",
        element: WorkerAddModal
    },
    {
        name: "leaves-modal",
        element: WorkerLeavesAddModal
    },
    {
        name: "workerhours-modal",
        element: WorkerHoursAddModal
    },
    {
        name: "tooth-modal",
        element: ToothNotesAddModal
    },
    {
        name: "tranfer-product",
        element: TransferProductModal
    },
    {
        name: "warehouse-modal",
        element: WarehouseAddModal
    },
    {
        name: "photo-modal",
        element: ShowPhotosModal
    },
    {
        name: "photo-add-modal",
        element: PhotooAddModal
    },
    {
        name: "patient-file-modal",
        element: PatientFileAddModal
    },
    {
        name: "expense",
        element: ExpenseModal
    },
    {
        name: "invoice-detail",
        element: InvoiceDetailModal
    },
    {
        name: "proforma-invoice-modal",
        element: ProformaAddModal
    }
]

export default modals