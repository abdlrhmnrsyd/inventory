
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
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
  Pencil,
  Download,
  Trash2,
  ChevronLeft, // Import ChevronLeft
  ChevronRight, // Import ChevronRight
} from "lucide-react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import TableRow from "../../components/TableRow";
import TableHeader from "../../components/TableHeader";
import TableCell from "../../components/TableCell";
import ProfileCard from "../../components/ProfileCard";
import Swal from "sweetalert2"; // Import SweetAlert
import * as XLSX from "xlsx"; // Import XLSX library
import Navbar from "../../components/Navbar";
import NavbarItem from "../../components/NavbarItem";
const PrinterComponent = () => {
  return (
    <>
    <div className="flex">
    <Sidebar>
          <Link to="/budget">
            <SidebarItem icon={<Database size={20} />} text="ISA"/>
          </Link>

          <Link to="/pc">
            <SidebarItem icon={<Monitor size={20} />} text="PC" active/>
          </Link>

          <Link to="/summary">
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

<div className="flex-1 p-6 overflow-x-auto">

<Navbar>
          <Link to ="/pc"><NavbarItem>PC</NavbarItem></Link>
          <Link to ="/printer"><NavbarItem active={true}>Printer</NavbarItem></Link>
          <Link to ="/thinclient"><NavbarItem>ThinClient</NavbarItem></Link>
          <Link to ="/monitor"><NavbarItem>Monitor</NavbarItem></Link>
        </Navbar>
</div>
      {/* <div className="flex-1 p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center mt-4 space-x-2">
            <input
              type="search"
             className="px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute text-gray-500 transform -translate-y-1/2 right-2 top-1/2 hover:text-gray-700"
              >
              
              </button>
            )}
             <button
              onClick={toggleCheckboxes}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
            >
              {showCheckboxes ? "Cancel Selection " : "Select"}
            </button>
            {showCheckboxes && (
              <button
                onClick={handleDeleteSelectedRows}
                className="flex items-center px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700"
                disabled={selectedRows.length === 0}
              >
                <Trash2 size={21} strokeWidth={1} />
              </button>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={toggleForm}
              className="px-4 py-2 text-white transition duration-200 ease-in-out bg-blue-500 rounded-md hover:bg-blue-700"
            >
              Add PC
            </button>
            <button
              onClick={toggleImportForm}
              className="px-4 py-2 text-white transition duration-200 ease-in-out bg-green-500 rounded-md hover:bg-green-700"
            >
              Import Excel
            </button>
          </div>
        </div>

        {isFormVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-w-5xl p-8 mx-2 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md">
              <h2 className="mb-2 text-lg font-semibold text-center">
                {form.id ? "Edit PC" : "Add New PC"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <label
                    htmlFor="it_code"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    IT Code
                  </label>
                  <input
                    type="text"
                    id="it_code"
                    name="it_code"
                    placeholder="IT Code"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.it_code}
                    onChange={handleInputChange}
                    disabled={isIpDuplicate || isMacAddressDuplicate} // Disable if IP and MAC is duplicate
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    placeholder="Brand"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.brand}
                    onChange={handleInputChange}
                    disabled={isIpDuplicate || isMacAddressDuplicate} // Disable if IP and MAC is duplicate
                  />
                </div>
                <div>
                  <label
                    htmlFor="serial_number"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Serial Number
                  </label>
                  <input
                    type="text"
                    id="serial_number"
                    name="serial_number"
                    placeholder="Serial Number"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.serial_number}
                    onChange={handleInputChange}
                   disabled={isIpDuplicate || isMacAddressDuplicate} // Disable if IP and MAC is duplicate
                  />
                </div>
                <div>
                  <label
                    htmlFor="ip_address"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    IP Address
                  </label>
                  <input
                    type="text"
                    id="ip_address"
                    name="ip_address"
                    placeholder="IP Address"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.ip_address}
                    onChange={handleInputChange}
                    disabled={isMacAddressDuplicate} // Disable if IP and MAC is duplicate
                  />
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div>
                  <label
                    htmlFor="mac_address"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Mac Address
                  </label>
                  <input
                    type="text"
                    id="mac_address"
                    name="mac_address"
                    placeholder="Mac Address"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.mac_address}
                    onChange={handleInputChange}
                    disabled={isIpDuplicate} // Disable if IP and MAC is duplicate
                  />
                  {macError && <p className="text-red-500">{macError}</p>}
                </div>
                <div>
                  <label
                    htmlFor="host_name"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Host Name
                  </label>
                  <input
                    type="text"
                    id="host_name"
                    name="host_name"
                    placeholder="Host Name"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.host_name}
                    onChange={handleInputChange}
                    disabled={isIpDuplicate || isMacAddressDuplicate} // Disable if IP and MAC is duplicate
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Location"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.location}
                    onChange={handleInputChange}
                    disabled={isIpDuplicate || isMacAddressDuplicate} // Disable if IP and MAC is duplicate
                  />
                </div>
                <div>
                  <label
                    htmlFor="business_unit"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Business Unit
                  </label>
                  <input
                    type="text"
                    id="business_unit"
                    name="business_unit"
                    placeholder="Business Unit"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.business_unit}
                    onChange={handleInputChange}
                    disabled={isIpDuplicate || isMacAddressDuplicate} // Disable if IP and MAC is duplicate
                  />
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="Department"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.department}
                    onChange={handleInputChange}
                    disabled={isIpDuplicate || isMacAddressDuplicate} // Disable if IP and MAC is duplicate
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.username}
                    onChange={handleInputChange}
                    disabled={isIpDuplicate || isMacAddressDuplicate} // Disable if IP and MAC is duplicate
                  />
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.status}
                    onChange={handleInputChange}
                    disabled={isIpDuplicate || isMacAddressDuplicate} // Disable if IP and MAC is duplicate
                  >
                    <option value="">Select Status</option>
                    <option value="OK">OK</option>
                    <option value="SCRAP">SCRAP</option>
                  </select>
                </div>

                <div className="flex justify-end col-span-3 mt-4 space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button onClick={toggleForm} className="text-red-500">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isImportFormVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-w-5xl p-8 mx-2 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md">
              <h2 className="mb-2 text-lg font-semibold text-center">
                Import Excel File
              </h2>
              <label
                htmlFor="file"
                className="block mb-1 font-medium text-gray-700"
              >
                Select Excel File
              </label>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="block w-full p-3 mb-4 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex justify-end space-x-4">
                <a
                  href="../../../public/excel/pc.xlsx"
                  download
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Download Template
                </a>
                <button
                  onClick={toggleImportForm}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          className="overflow-x-auto max-h-96"
          style={{ overflowY: "scroll", overflowX: "auto" }} // Ensure horizontal overflow is enabled
          ref={tableContainerRef}
        >
          <div style={{ width: "2000px" }}>
            <Table style={{ minWidth: "2000px" }}>
            <TableHeader>
                {showCheckboxes && (
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                )}
                <TableCell>No</TableCell>
                <TableCell>IT Code</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Mac Address</TableCell>
                <TableCell>Host Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Business Unit</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableHeader>

              {pcsFiltered.map((pc, index) => (
                <TableRow key={pc.id}>
                  {showCheckboxes && (
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(pc.id)}
                        onChange={() => handleSelectRow(pc.id)}
                      />
                    </TableCell>
                  )}
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{pc.it_code}</TableCell>
                  <TableCell>{pc.brand}</TableCell>
                  <TableCell>{pc.serial_number}</TableCell>
                  <TableCell>{pc.ip_address}</TableCell>
                  <TableCell>{pc.mac_address}</TableCell>
                  <TableCell>{pc.host_name}</TableCell>
                  <TableCell>{pc.location}</TableCell>
                  <TableCell>{pc.business_unit}</TableCell>
                  <TableCell>{pc.department}</TableCell>
                  <TableCell>{pc.username}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md ${
                        pc.status === "OK"
                          ? "bg-green-500 text-white"
                          : pc.status === "Scrap"
                          ? "bg-red-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {pc.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleEdit(pc)}
                      className="px-2 py-1 mr-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(pc.id)}
                      className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </div>
        </div>

        <div className="flex items-center justify-center mt-2">
          <button
            onClick={scrollLeft} // Attach scrollLeft function
            className="px-4 py-2 mr-2 text-white bg-gray-300 rounded-md hover:bg-gray-600" // Added margin-right
            >
              <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollRight} // Attach scrollRight function
            className="px-4 py-2 text-white bg-gray-300 rounded-md hover:bg-gray-600"
            >
              <ChevronRight size={18} />
          </button>
        </div>
      </div> */}
    </div>
  </>
  );
};

export default PrinterComponent;
