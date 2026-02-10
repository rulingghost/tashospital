import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './pages/RootLayout'
import HomePage from './pages/home/HomePage'
import PatientLayout from './pages/patient/PatientLayout'
import Patients from './pages/patient/Patients'
import CompanyStructure from './UI/CompanyStructure '
import PatientDetail from './pages/patient/patientDetail/PatientDetail'
import PatientOverwiev from './pages/patient/patientDetail/PatientOverwiev'
import PatientFiles from './pages/patient/patientDetail/PatientFiles'
import PatientSenssion from './pages/patient/patientDetail/PatientSenssion'
import PatientOther from './pages/patient/patientDetail/PatientOther'
import PatientIDInformation from './pages/patient/patientDetail/PatientIDInformation'
import PatientBill from './pages/patient/patientDetail/PatientBill'
import MedicalForm from './MedicalForm'
import StockLayout from './pages/stock/StockLayout'
import StockOverwiev from './pages/stock/StockOverwiev'
import StockProducts from './pages/stock/StockProducts'
import HrLayout from './pages/hr/HrLayout'
import HrHierarchy from './pages/hr/HrHierarchy'
import HrRecruitment from './pages/hr/HrRecruitment'
import HrPersonnel from './pages/hr/HrPersonnel'
import HrWorkingHours from './pages/hr/HrWorkingHours'
import HrLeaveManagement from './pages/hr/HrLeaveManagement'
import FileUpload from './FileUpload'
import StockWarehouse from './pages/stock/StockWarehouse'
import StockOrder from './pages/stock/StockOrder'
import Calender from './pages/calendar/Calender'
import { Inbox, Settings } from 'lucide-react'
import Chat from './components/lead/Chat'
import InboxLayout from './components/lead/InboxLayout'
import StockStatistics from './pages/stock/StockStatistics'
import HrSummaryFile from './pages/hr/HrSummaryFile'
import HrManagement from './pages/hr/HrManagement'
import HrChecklist from './pages/hr/HrChecklist'
import HrQuests from './pages/hr/HrQuests'
import HrDetail from './pages/hr/HrDetail'
import Billing from './pages/billing/Billing'
import ENabiz from './pages/ENabiz'
import Reports from './pages/Reports'
import SettingsPage from './pages/SettingsPage'
import Deneme from './UI/Deneme'
import Bodro from './pages/Bodro'
import PatientEpikriz from './pages/patient/patientDetail/PatientEpikriz'
import PatientPhotos from './pages/patient/patientDetail/PatientPhotos'
import LoginPage from './pages/LoginPage'
import PatientPoll from './pages/patient/patientDetail/PatientPoll'
import BillingDetail from './pages/billing/BillingDetail'
import BillingLayout from './pages/billing/BillingLayout'
import PatientListBill from './pages/billing/PatientListBill'
import BillingExpense from './pages/billing/BillingExpense'
import Fatura from './pages/billing/Fatura'
import ProformaFatura from './pages/billing/ProformaFatura'
import NabizLayout from './pages/enabiz/NabizLayout'
import NabizNotFound from './pages/enabiz/NotFound'
import NabizPatient from './pages/enabiz/NabizPatient'
import Test from './pages/enabiz/Test'
import { useSelector } from 'react-redux';

const RootRedirect = () => {
  const token = useSelector(state => state.auth.token);
  return <Navigate to={token ? "/patients" : "/login"} replace />;
};

function App() {  

  const router = createBrowserRouter([
    { path: "/",
      element: <RootLayout />,
      children: [
        {path: "/", element: <RootRedirect />},
        { path : "/calendar", element: <Calender />},
        { path : "/patients", 
          element : <PatientLayout /> ,
          children : [
            { path: "/patients", element: <Patients /> },
           
            { path : ":patientId", 
              element: <PatientDetail />,
              children: [
                { path: "overview", element: <PatientOverwiev /> },
                { path: "other", element: <PatientOther /> },
                { path: "IDinformation", element: <PatientIDInformation /> },
                { path: "sessionInformation", element: <PatientSenssion /> },
                { path: "epikriz", element: <PatientEpikriz />},
                { path: "files", element: <PatientFiles /> },
                { path: "bill", element: <PatientBill /> },
                { path: "photos", element: <PatientPhotos /> },
                { path: "poll", element: <PatientPoll />},
                { index: true, element: <Navigate to="overview" replace /> }
              ]
            },
            
          ]
        },
        { 
          path: "/lead", 
          element: <InboxLayout />,
          children: [
            { path: "/lead", element: <Inbox /> },
            { path: ":chatId", element: <Chat /> },
            { index: true, element: <Chat to=":chatId" replace /> }
          ]
        },
        { path: "/stock",
          element: <StockLayout />,
          children: [
            { path: "overwiev", element: <StockOverwiev />},
            { path: "products", element: <StockProducts />},
            { path: "warehouse", element: <StockWarehouse />},
            { path: "orders", element: <StockOrder />},
            { path: "statistics", element: <StockStatistics />},
            { index: true, element: <Navigate to="overwiev" replace /> }
          ]
        },        
        { path: "/human-resources/personnel/:workerID", element: <HrSummaryFile />},
        { path: "KPI-checklist", element: <HrChecklist />},
        { path: "/human-resources",
          element: <HrLayout />,
          children: [            
            { path: "hierarchy", element: <HrHierarchy />},
            { path: "personnel", element: <HrPersonnel />},
            { path: "working-hours", element: <HrWorkingHours />},
            { path: "leave-management", element: <HrLeaveManagement />},
            { path: "recruitment", element: <HrRecruitment />},            
            { path: "KPI-management", element: <HrManagement />},
            
            { path: "KPI-quests", element: <HrQuests />},
            { path: "KPI-detail", element: <HrDetail />},
            { index: true, element: <Navigate to="hierarchy" replace /> }
          ]
        },
        { path: "billing", 
          element: <BillingLayout />,
          children:[
            { path: "patient-list", element: <PatientListBill />},
            { path: "expenses", element: <BillingExpense />},
            { path: "bill", element: <Fatura />},
            { path: "proforma", element: <ProformaFatura />},
            { index: true, element: <Navigate to="patient-list" replace /> }
          ]
        },
        { path: "billing/:billNo", element: <BillingDetail />},
        { path: "e-nabiz", 
          element: <NabizLayout />,
          children: [
            { path: "patient", element: <NabizPatient />},
            { path: "receipt", element: <NabizNotFound />},
            { path: "report", element: <NabizNotFound />},
            { path: "analysis", element: <NabizNotFound />},
            { path: "radiology", element: <NabizNotFound />},
            { path: "pathology", element: <NabizNotFound />},
            { path: "epikriz", element: <NabizNotFound />},
            { path: "body-points", element: <Test />},
            { path: "*", element: <NabizNotFound />},
            { index: true, element: <Navigate to="patient" replace /> }
          ]        
        },
        { path: "reporting", element: <Reports />},
        { path: "settings", element: <SettingsPage />},
        { path: "bodro", element: <Bodro />},   
        { path: "deneme", element: <Test />},          
      ]
    },
    { path: "login", element: <LoginPage/>}   
  ])

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
