import React, { useState } from "react";
import {
  Info,
  Database,
  Monitor,
  Server,
  Network,
  Briefcase,
  FolderTree,
  BookOpen,
  BarChartHorizontal,
  Folder,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { Link } from "react-router-dom";

function DecomServerComponent() {
  return (
    <>
      <div className="flex">
        <Sidebar>
          <Link to="/budget">
            <SidebarItem icon={<Database size={20} />} text="ISA" />
          </Link>

          <Link to="/pc">
            <SidebarItem icon={<Monitor size={20} />} text="PC" />
          </Link>

          <Link to="/summary">
            <SidebarItem icon={<Server size={20} />} text="DC" active />
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
            <SidebarItem
              icon={<BarChartHorizontal size={20} />}
              text="Survey Feedback Averis"
            />
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
          {/* Integrasi MenuItem yang berisi Dropdown */}
          <h1>hello</h1>
          {/* Konten lainnya di halaman ini */}
        </div>
      </div>
    </>
  );
}

export default DecomServerComponent;
