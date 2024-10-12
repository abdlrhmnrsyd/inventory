import { Info, Database, Monitor, Server, Network, Briefcase, FolderTree, BookOpen, BarChartHorizontal, Folder, Pencil, Trash2 } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { Link } from "react-router-dom";
import React from 'react';
import Table from "../../components/Table";
import TableRow from "../../components/TableRow";
import TableHeader from "../../components/TableHeader";
import TableCell from "../../components/TableCell";
import ProfileCard from '../../components/ProfileCard';



function DcComponent() {
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

          <Link to="/dc">
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
        <div className="flex items-center justify-between mb-4">
          <input type="search" className="px-3 py-2 border border-gray-300 rounded-md" placeholder="Search..." />
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md">Add ThinClient</button>
        </div>
        
        <Table>
            <TableHeader>
              <TableCell>No</TableCell>
              <TableCell>it code</TableCell>
              <TableCell>brand</TableCell>
              <TableCell>serial number</TableCell>
              <TableCell>ip address</TableCell>
              <TableCell>status</TableCell>
              <TableCell>action</TableCell>
            </TableHeader>
            
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>RPF PLA 2 4 0002</TableCell>
              <TableCell>HP T5530</TableCell>
              <TableCell>CNV81801TM</TableCell>
              <TableCell>LOCAL</TableCell>
              <TableCell>scrap</TableCell>
              <TableCell>
                <button className="px-3 py-1 text-white bg-blue-500 rounded-md "><Pencil strokeWidth={1} /></button>
                <button className="px-3 py-1 text-white bg-red-500 rounded-md"><Trash2 strokeWidth={1} /></button>
              </TableCell>
            </TableRow>
             
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>RPF PLA 2 4 0002</TableCell>
              <TableCell>HP T5530</TableCell>
              <TableCell>CNV81801TM</TableCell>
              <TableCell>LOCAL</TableCell>
              <TableCell>scrap</TableCell>
              <TableCell>
                <button className="px-3 py-1 text-white bg-blue-500 rounded-md "><Pencil strokeWidth={1} /></button>
                <button className="px-3 py-1 text-white bg-red-500 rounded-md"><Trash2 strokeWidth={1} /></button>
              </TableCell>
            </TableRow>
             
             <TableRow>
              <TableCell>3</TableCell>
              <TableCell>RPF PLA 2 4 0002</TableCell>
              <TableCell>HP T5530</TableCell>
              <TableCell>CNV81801TM</TableCell>
              <TableCell>LOCAL</TableCell>
              <TableCell>scrap</TableCell>
              <TableCell>
                <button className="px-3 py-1 text-white bg-blue-500 rounded-md "><Pencil strokeWidth={1} /></button>
                <button className="px-3 py-1 text-white bg-red-500 rounded-md"><Trash2 strokeWidth={1} /></button>
              </TableCell>
            </TableRow>
             
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>RPF PLA 2 4 0002</TableCell>
              <TableCell>HP T5530</TableCell>
              <TableCell>CNV81801TM</TableCell>
              <TableCell>LOCAL</TableCell>
              <TableCell>scrap</TableCell>
              <TableCell>
                <button className="px-3 py-1 text-white bg-blue-500 rounded-md "><Pencil strokeWidth={1} /></button>
                <button className="px-3 py-1 text-white bg-red-500 rounded-md"><Trash2 strokeWidth={1} /></button>
              </TableCell>
            </TableRow>
             
             

           
           
          </Table>
        </div>
    </div>
    </>
  );
}

export default DcComponent;