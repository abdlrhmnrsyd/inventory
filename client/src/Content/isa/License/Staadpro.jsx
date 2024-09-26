import React from "react";
import { Link } from "react-router-dom";
import { Info, Database, Monitor, Server, Network, Briefcase, FolderTree, BookOpen, BarChartHorizontal, Folder } from "lucide-react";
import Sidebar, { SidebarItem } from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar"; // Import Navbar
import NavbarItem from "../../../components/NavbarItem";
import ProfileCard from '../../../components/ProfileCard';

function LicenseComponent() {
  return (
    <>
      <div className="flex">
      <Sidebar>
          <Link to="/budget">
            <SidebarItem icon={<Database size={20} />} text="ISA" active />
          </Link>

          <Link to="/pc">
            <SidebarItem icon={<Monitor size={20} />} text="PC" />
          </Link>

          <Link to="/dc">
            <SidebarItem icon={<Server size={20} />} text="DC" />
          </Link>

          <Link to="/telnet">
            <SidebarItem icon={<Network size={20} />} text="Telnet" />
          </Link>

          <Link to="/project">
            <SidebarItem icon={<Briefcase size={20} />} text="Project" />
          </Link>

          <Link to="/cab">
            <SidebarItem icon={<FolderTree size={20} />} text="CAB" />
          </Link>

          <Link to="/sop_cp">
            <SidebarItem icon={<BookOpen size={20} />} text="SOP/CP" />
          </Link>

          <Link to="/SurveyFeedbackAveris">
            <SidebarItem icon={<BarChartHorizontal size={20} />} text="Survey Feedback Averis" />
          </Link>

          <Link to="/OtherDocuments">
            <SidebarItem icon={<Folder size={20} />} text="Other Documents" />
          </Link>

          <Link to="/help">
            <SidebarItem icon={<Info size={20} />} text="Help" />
          </Link>

          <hr className="my-3" />
        </Sidebar>

        <div className="flex-1 p-6 main-content">
        <Navbar>
            <Link to ="/budget"><NavbarItem>Budget</NavbarItem></Link>
            <Link to ="/kpi_pis"><NavbarItem>KPI/PIS</NavbarItem></Link>
            <Link to ="/audit"><NavbarItem>Audit</NavbarItem></Link>
            <Link to="/rfc_vendor"><NavbarItem>RFC Vendor</NavbarItem></Link>
            <Link to="/vendor_repair"><NavbarItem>Vendor Repair</NavbarItem></Link>
            <Link to="/microsoft"><NavbarItem active={true}>License</NavbarItem></Link>
            <Link to="/audit1"><NavbarItem>Audit 1</NavbarItem></Link>
            <Link to="/audit2"><NavbarItem>Audit 2</NavbarItem></Link>
          </Navbar>
          <div>
            <br />
          <select 
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => window.location.href = e.target.value}
          >
            <option value="/microsoft">Microsoft</option>
            <option value="/vmware">VMWare</option>
            <option value="/veritas">Veritas</option>
            <option value="/hexnode">Hexnode</option>
            <option value="/crowdstrike">Crowdstrike</option>
            <option value="/ipguard">IP Guard</option>
            <option value="/fde">FDE</option>
            <option value="/veemep">Veem EP</option>
            <option value="/autocad">Autocad</option>
            <option value="/adobe">Adobe</option>
            <option value="/minitab">Minitab</option>
            <option value="/mindmngr">Mind Mngr</option>
            <option value="/sketchup">Sketchup</option>
            <option value="/staadpro" selected>StaadPro</option>
            <option value="/lidar">LIDAR</option>
            <option value="/arcgis">ARCGIS</option>
            <option value="/zoom">Zoom</option>
            <option value="/others">Others</option>
          </select>
          <br />
          
          <h1>staadpro</h1>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default LicenseComponent;
