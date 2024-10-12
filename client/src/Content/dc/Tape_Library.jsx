import React, { useState } from 'react';
import { Info, Database, Monitor, Server, Network, Briefcase, FolderTree, BookOpen, BarChartHorizontal, Folder, Pencil, Trash2 } from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import NavbarItem from "../../components/NavbarItem";
import Table from "../../components/Table";
import TableRow from "../../components/TableRow";
import TableHeader from "../../components/TableHeader";
import TableCell from "../../components/TableCell";
import ProfileCard from '../../components/ProfileCard';

function TapeLibraryComponent() {



  const [dropdownVisible, setDropdownVisible] = useState({
    management: false,
    tape: false,
    server: false,
    storage: false,
    router: false,
    device: false,
    infrastructure: false,
    managementStorage: false, // Unique key for storage and switch
    managementRouter: false, // Unique key for router and pmis
  });

  const toggleDropdown = (name) => {
    setDropdownVisible((prev) => {
      // Reset all dropdowns to false, then toggle the selected one
      const newDropdownState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === name ? !prev[key] : false;
        return acc;
      }, {});
      return newDropdownState;
    });
  };
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
          
         <Navbar className="flex flex-wrap items-center justify-between">
            <div className="relative inline-block text-left">
              <button
                onClick={() => toggleDropdown("management")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Management
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownVisible.management && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to="/summary"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Summary
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/master"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Master
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Repeat similar structure for other dropdowns */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => toggleDropdown("tape")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Tape
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownVisible.tape && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to="/tape_driver"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Driver
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/tape_library"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Library
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="relative inline-block text-left">
              <button
                onClick={() => toggleDropdown("server")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Server
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownVisible.server && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to="/server"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Server
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/decom_server"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Decom Server 
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Repeat similar structure for 'storage', 'router', and 'device' */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => toggleDropdown("managementStorage")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Management
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownVisible.managementStorage && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to="/storage"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Storage
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/Switch"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Switch
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative inline-block text-left">
              <button
                onClick={() => toggleDropdown("managementRouter")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Management
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownVisible.managementRouter && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to="/Ruter"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Router
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/Pmis"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Pmis
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="relative inline-block text-left">
              <button
                onClick={() => toggleDropdown("device")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Device
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownVisible.device && (
               <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to="/security_device"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Security Device
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/monitoring_device"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Monitoring Device
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative inline-block text-left">
              <button
                onClick={() => toggleDropdown("infrastructure")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Infrastructure
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownVisible.infrastructure && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to="/firewall"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Firewall
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dc_Utility_equipment"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        DC Utility Equipment
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/fiber_optik"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Fiber Optic
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
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

export default TapeLibraryComponent;