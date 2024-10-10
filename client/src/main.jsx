import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Budget from "./Content/isa/Budget/Budget.jsx";
import Kip_Pis from "./Content/isa/KpiPis/Kpi_Pis.jsx";
import Audit from "./Content/isa/Audit/Audit.jsx";
import Rfc_vendor from "./Content/isa/RfcVendor/Rfc_vendor.jsx";
import VendorRepair from "./Content/isa/VendorRepair/VendorRepair.jsx";

import Microsoft from "./Content/isa/License/Microsoft.jsx";
import Vmware from "./Content/isa/License/VmWare.jsx";
import Veritas from "./Content/isa/License/Veritas.jsx";
import Hexnode from "./Content/isa/License/Hexnode.jsx";
import Crowdstrike from "./Content/isa/License/Crowdstrike.jsx";
import IpGuard from "./Content/isa/License/IpGuard.jsx";
import Fde from "./Content/isa/License/Fde.jsx";
import VeemEp from "./Content/isa/License/VeemEp.jsx";
import Autocad from "./Content/isa/License/Autocad.jsx";
import Adobe from "./Content/isa/License/Adobe.jsx";
import Minitab from "./Content/isa/License/Minitab.jsx";
import MindMngr from "./Content/isa/License/Mindmngr.jsx";
import Sketchup from "./Content/isa/License/Sketchup.jsx";
import StaadPro from "./Content/isa/License/Staadpro.jsx";
import Lidar from "./Content/isa/License/Lidar.jsx";
import Arcgis from "./Content/isa/License/Arcgis.jsx";
import Zoom from "./Content/isa/License/Zoom.jsx";
import Other from "./Content/isa/License/Other.jsx";

import Audit1 from "./Content/isa/Audit1/Audit1.jsx";
import Audit2 from "./Content/isa/Audit2/Audit2.jsx";

import Pc from "./Content/pc/Pc.jsx";
import ThinClient from "./Content/pc/thinclient.jsx";
import Printer from "./Content/pc/printer.jsx";
import Monitor from "./Content/pc/Monitor.jsx";


import Summary from "./Content/dc/Summary.jsx";
import Master from "./Content/dc/Master.jsx";
import Server from "./Content/dc/Server.jsx";
import Storage from "./Content/dc/Storage.jsx";
import Switch from "./Content/dc/Switch.jsx";
import Ruter from "./Content/dc/Ruter.jsx";
import Pmis from "./Content/dc/Pmis.jsx";
import SecurityDevice from "./Content/dc/Security_Device.jsx";
import TapeDriver from "./Content/dc/Tape_Driver.jsx";
import TapeLibrary from "./Content/dc/Tape_Library.jsx";
import Firewall from "./Content/dc/Firewall.jsx";
import DcUtilityEquipment from "./Content/dc/Dc_Utility_Equipment.jsx";
import MonitorDevice from "./Content/dc/Monitoring_Device.jsx";
import FiberOptik from "./Content/dc/Fiber_Optik.jsx";
import DecomServer from "./Content/dc/Decom_Server.jsx";


import Telnet from "./Content/telnet/Telnet.jsx";
import Cab from "./Content/cab/Cab.jsx";
import Help from "./Content/help/Help.jsx";
import OtherDocuments from "./Content/otherdocuments/OtherDocuments.jsx";
import Project from "./Content/project/Project.jsx";
import Sop_Cp from "./Content/sop_cp/Sop_Cp.jsx";
import SurveyFbAveris from "./Content/survey/SurveyFbAveris.jsx";
import Register from "./RegisterForm.jsx";
import Welcome from "./Welcome.jsx";
import LoginForm from "./LoginForm.jsx";
import Profile from "./ProfilePage.jsx";

import "./index.css";




createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      {/* Route ISA */}
      <Route path="/budget" element={<Budget />} />
      <Route path="/kpi_pis" element={<Kip_Pis />} />
      <Route path="/audit" element={<Audit />} />
      <Route path="/rfc_vendor" element={<Rfc_vendor />} />
      <Route path="/vendor_repair" element={<VendorRepair />} />

      <Route path="/microsoft" element={<Microsoft />} />
      <Route path="/vmware" element={<Vmware />} />
      <Route path="/veritas" element={<Veritas />} />
      <Route path="/hexnode" element={<Hexnode />} />
      <Route path="/crowdstrike" element={<Crowdstrike />} />
      <Route path="/ipguard" element={<IpGuard />} />
      <Route path="/fde" element={<Fde />} />
      <Route path="/veemep" element={<VeemEp />} />
      <Route path="/autocad" element={<Autocad />} />
      <Route path="/adobe" element={<Adobe />} />
      <Route path="/minitab" element={<Minitab />} />
      <Route path="/mindmngr" element={<MindMngr />} />
      <Route path="/sketchup" element={<Sketchup />} />
      <Route path="/staadpro" element={<StaadPro />} />
      <Route path="/lidar" element={<Lidar />} />
      <Route path="/arcgis" element={<Arcgis />} />
      <Route path="/zoom" element={<Zoom />} />
      <Route path="/other" element={<Other />} />
      <Route path="/audit1" element={<Audit1 />} />
      <Route path="/audit2" element={<Audit2 />} />
      {/* End Of Route ISA */}

      <Route path="/pc" element={<Pc />} />
      <Route path="/thinclient" element={<ThinClient />} />
      <Route path="/printer" element={<Printer />} />
      <Route path="/monitor" element={<Monitor />} />

       {/* Route DC */}
      <Route path="/summary" element={<Summary />} />
      <Route path="/master" element={<Master />} />
      <Route path="/server" element={<Server />} />
      <Route path="/storage" element={<Storage />}/>
      <Route path="/switch" element={<Switch />} />
      <Route path="/ruter" element={<Ruter />} />
      <Route path="/pmis" element={<Pmis />} />
      <Route path="/security_device" element={<SecurityDevice />} />
      <Route path="/tape_driver" element={<TapeDriver/>} />
      <Route path="/tape_library" element={<TapeLibrary/>} />
      <Route path="/firewall" element={<Firewall/>} />
      <Route path="/dc_Utility_equipment" element={<DcUtilityEquipment/>} />
      <Route path="/monitoring_device" element={<MonitorDevice />} />
      <Route path="/fiber_optik" element={<FiberOptik />} />
      <Route path="/decom_server" element={<DecomServer />} />
     
      {/* End Of Route DC */}
      <Route path="/telnet" element={<Telnet />} />
      <Route path="/cab" element={<Cab />} />
      <Route path="/help" element={<Help />} />
      <Route path="/OtherDocuments" element={<OtherDocuments />} />
      <Route path="/project" element={<Project />} />
      <Route path="/sop_cp" element={<Sop_Cp />} />
      <Route path="/SurveyFeedbackAveris" element={<SurveyFbAveris />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
);