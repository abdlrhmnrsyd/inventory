import { Info, Database, Monitor, Server, Network, Briefcase, FolderTree, BookOpen, BarChartHorizontal, Folder, Pencil, Trash2 } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { Link } from "react-router-dom";
import React from 'react';
import Navbar from "../../components/Navbar";
import NavbarItem from "../../components/NavbarItem";
import Table from "../../components/Table";
import TableRow from "../../components/TableRow";
import TableHeader from "../../components/TableHeader";
import TableCell from "../../components/TableCell";
import ProfileCard from '../../components/ProfileCard';

function MonitoringDeviceComponent() {
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
          <div class="relative inline-block text-left">
    <div class="group">
        <button type="button"
            class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
             Management
            <svg class="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
            </svg>
        </button>

        <div
            class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
            <div class="py-1">
                <Link to="/summary" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Summary</Link>
                <Link to="/master" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Master</Link>
            </div>
        </div>
    </div>
</div>
  <div class="relative inline-block text-left">
    <div class="group">
        <button type="button"
            class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Tape
            <svg class="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
            </svg>
        </button>

        <div
            class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
            <div class="py-1">
                <Link to="/tape_driver" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Driver</Link>
                <Link to="/tape_library" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Lbrary</Link>
            </div>
        </div>
    </div>
</div>

  <div class="relative inline-block text-left">
    <div class="group">
        <button type="button"
            class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Server
            <svg class="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
            </svg>
        </button>

        <div
            class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
            <div class="py-1">
                <Link to="/server" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Server</Link>
                <Link to="/decom_server" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Decom Server</Link>
            </div>
        </div>
    </div>
</div>

 <div class="relative inline-block text-left">
    <div class="group">
        <button type="button"
            class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
             Management
            <svg class="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
            </svg>
        </button>

        <div
            class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
            <div class="py-1">
                <Link to="/storage" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Storage</Link>
                <Link to="/switch" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Switch</Link>
            </div>
        </div>
    </div>
</div>

 <div class="relative inline-block text-left">
    <div class="group">
        <button type="button"
            class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
             Management
            <svg class="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
            </svg>
        </button>

        <div
            class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
            <div class="py-1">
                <Link to="/ruter" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Router</Link>
                <Link to="/pmis" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Pmis</Link>
            </div>
        </div>
    </div>
</div>

<div class="relative inline-block text-left">
    <div class="group">
        <button type="button"
            class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
             Device
            <svg class="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
            </svg>
        </button>

        <div
            class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
            <div class="py-1">
                <Link to="/security_device" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">security device</Link>
                <Link to="/monitoring_device" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Monitoring Device</Link>
            </div>
        </div>
    </div>
</div>
          <div class="relative inline-block text-left">
    <div class="group">
        <button type="button"
            class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
             Infrastructure
            <svg class="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
            </svg>
        </button>

        <div
            class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
            <div class="py-1">
                <Link to="/firewall" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Firewall</Link>
                <Link to="/dc_utility_equipment" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dc Utility Equipment</Link>
                <Link to="/fiber_optik" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fiber Optik</Link>
            </div>
        </div>
    </div>
</div>
        </Navbar>
        </div>
       
        
        {/* <Table>
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
             
          </Table> */}
        </div>
    </>
  );
}

export default MonitoringDeviceComponent;