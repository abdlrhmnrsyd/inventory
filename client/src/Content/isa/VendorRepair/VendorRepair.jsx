import { Link, useNavigate } from "react-router-dom";
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
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import NavbarItem from "../../../components/NavbarItem";
import Table from "../../../components/Table";
import TableRow from "../../../components/TableRow";
import TableHeader from "../../../components/TableHeader";
import TableCell from "../../../components/TableCell";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

const VendorRepairComponent = () => {
  const [vendorRepair, setVendorRepair] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isImportFormVisible, setImportFormVisible] = useState(false);
  const [form, setForm] = useState({
    id: "",
    repair_date: "",
    ticket_number: "",
    ageing: "",
    engineer_name: "",
    username: "",
    bu_name: "",
    material_name: "",
    brand: "",
    type: "",
    serial_number: "",
    cost_center: "",
    pr_number: "",
    po_number: "",
    quotation_date: "",
    cost_without: "",
    status: "",
    vendor_delivery: "",
    date: "",
    created_by_ses: "",
    remarks: "",
  });
  //format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isTicketNumberDuplicate, setIsTicketNumberDuplicate] = useState(false);

  const tableContainerRef = useRef(null);

  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchVendorRepair();
    fetchProfile();
  }, []);

  const fetchVendorRepair = async () => {
    try {
      const response = await axios.get("http://localhost:3001/vendor-repair");
      setVendorRepair(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:3001/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (
      name === "repair_date" ||
      name === "quotation_date" ||
      name === "date"
    ) {
      formattedValue = dayjs(value).format("YYYY-MM-DD"); // Ensure the format is YYYY-MM-DD
    }

    setForm({ ...form, [name]: formattedValue });

    if (name === "ticket_number") {
      const isDuplicateTicketNumber = vendorRepair.some(
        (repair) => repair.ticket_number === value
      );
      if (isDuplicateTicketNumber) {
        setError(
          "Ticket Number already exists. Please enter a unique Ticket Number."
        );
        setIsTicketNumberDuplicate(true);
      } else {
        setError("");
        setIsTicketNumberDuplicate(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isDuplicateTicketNumber = vendorRepair.some(
      (repair) => repair.ticket_number === form.ticket_number && repair.id !== form.id
    );
  
    if (isDuplicateTicketNumber) {
      showAlert("Ticket Number already exists. Please enter a unique Ticket Number.");
      return;
    }

    if (
      !form.repair_date ||
      !form.ticket_number ||
      !form.ageing ||
      !form.engineer_name ||
      !form.username ||
      !form.bu_name ||
      !form.material_name ||
      !form.brand ||
      !form.type ||
      !form.serial_number ||
      !form.cost_center ||
      !form.pr_number ||
      !form.po_number ||
      !form.quotation_date ||
      !form.cost_without ||
      !form.status ||
      !form.vendor_delivery ||
      !form.date ||
      !form.created_by_ses ||
      !form.remarks
    ) {
      showAlert("Please fill in all fields before submitting.");
      return;
    }

    try {
      console.log("Submitting form data:", form); // Logging form data

      if (form.id) {
        await axios.put(`http://localhost:3001/vendor-repair/${form.id}`, form);
        showAlert("Vendor repair updated successfully!", "success");
        setIsEditSuccess(true);
        setTimeout(() => setIsEditSuccess(false), 3000);
      } else {
        await axios.post("http://localhost:3001/vendor-repair", form);
        showAlert("Vendor repair added successfully!", "success");
      }
      setForm({
        id: "",
        repair_date: "",
        ticket_number: "",
        ageing: "",
        engineer_name: "",
        username: "",
        bu_name: "",
        material_name: "",
        brand: "",
        type: "",
        serial_number: "",
        cost_center: "",
        pr_number: "",
        po_number: "",
        quotation_date: "",
        cost_without: "",
        status: "",
        vendor_delivery: "",
        date: "",
        created_by_ses: "",
        remarks: "",
      });
      fetchVendorRepair();
      setFormVisible(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      console.error("Error submitting form:", err.message); // Logging error message
    }
  };

  const handleEdit = (repair) => {
    setForm({
      ...repair,
      repair_date: dayjs(repair.repair_date).format("YYYY-MM-DD"),
      quotation_date: dayjs(repair.quotation_date).format("YYYY-MM-DD"),
      date: dayjs(repair.date).format("YYYY-MM-DD"),
    });
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/vendor-repair/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Vendor repair removed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchVendorRepair();
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const showAlert = (message, iconType = "warning") => {
    Swal.fire({
      title: iconType === "success" ? "Success" : "Warning",
      text: message,
      icon: iconType,
      confirmButtonText: "OK",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Check for duplicate ticket numbers in the imported data
      const importedTicketNumbers = jsonData.map((item) => item.ticket_number);
      const existingTicketNumbers = vendorRepair.map((item) => item.ticket_number);
      const duplicateTicketNumbers = importedTicketNumbers.filter((ticketNumber) =>
        existingTicketNumbers.includes(ticketNumber)
      );

      if (duplicateTicketNumbers.length > 0) {
        showAlert(
          `Duplicate Ticket Numbers found: ${duplicateTicketNumbers.join(", ")}. Please ensure all Ticket Numbers are unique.`,
          "error"
        );
        return;
      }

      try {
        await axios.post(
          "http://localhost:3001/vendor-repair/import",
          jsonData
        );
        showAlert("Data imported successfully!", "success");
        fetchVendorRepair();
        setImportFormVisible(false);
      } catch (error) {
        showAlert("Failed to import data. Please try again.", "error");
        console.error("Error importing data:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const vendorRepairFiltered = vendorRepair.filter((repair) =>
    repair.ticket_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    if (showCheckboxes) {
      setSelectedRows([]);
      setSelectAll(false);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(vendorRepairFiltered.map((repair) => repair.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelectedRows = async () => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: `Are you sure you want to delete the selected ${selectedRows.length} items?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        await Promise.all(
          selectedRows.map((id) =>
            axios.delete(`http://localhost:3001/vendor-repair/${id}`)
          )
        );
        Swal.fire({
          title: "Deleted!",
          text: `${selectedRows.length} items removed successfully.`,
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchVendorRepair();
        setSelectedRows([]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      setSelectedRows([]);
    }
  };

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
    setError("");
    setIsTicketNumberDuplicate(false);
    if (isFormVisible) {
      setForm({
        id: "",
        repair_date: "",
        ticket_number: "",
        ageing: "",
        engineer_name: "",
        username: "",
        bu_name: "",
        material_name: "",
        brand: "",
        type: "",
        serial_number: "",
        cost_center: "",
        pr_number: "",
        po_number: "",
        quotation_date: "",
        cost_without: "",
        status: "",
        vendor_delivery: "",
        date: "",
        created_by_ses: "",
        remarks: "",
      });
    }
  };

  const toggleImportForm = () => {
    setImportFormVisible(!isImportFormVisible);
  };

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
            <Link to="/budget">
              <NavbarItem>Budget</NavbarItem>
            </Link>
            <Link to="/kpi_pis">
              <NavbarItem>KPI/PIS</NavbarItem>
            </Link>
            <Link to="/audit">
              <NavbarItem>Audit</NavbarItem>
            </Link>
            <Link to="/rfc_vendor">
              <NavbarItem>RFC Vendor</NavbarItem>
            </Link>
            <Link to="/vendor_repair">
              <NavbarItem active={true}>Vendor Repair</NavbarItem>
            </Link>
            <Link to="/microsoft">
              <NavbarItem>License</NavbarItem>
            </Link>
            <Link to="/audit1">
              <NavbarItem>Audit 1</NavbarItem>
            </Link>
            <Link to="/audit2">
              <NavbarItem>Audit 2</NavbarItem>
            </Link>
          </Navbar>

          <div>
            <div className="flex-1 p-6 overflow-x-auto">
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
                    ></button>
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
                    Add Vendor Repair
                  </button>
                  <button
                    onClick={toggleImportForm}
                    className="px-4 py-2 text-white transition duration-200 ease-in-out bg-green-500 rounded-md hover:bg-green-700"
                  >
                    Import Excel
                  </button>
                </div>
              </div>

              <div
                className="overflow-x-auto max-h-96"
                style={{ overflowY: "scroll", overflowX: "auto" }}
                ref={tableContainerRef}
              >
                <div style={{ width: "3000px" }}>
                  <Table style={{ minWidth: "3000px" }}>
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
                      <TableCell>Repair Date</TableCell>
                      <TableCell>Ticket Number</TableCell>
                      <TableCell>Ageing</TableCell>
                      <TableCell>Engineer Name</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>BU's</TableCell>
                      <TableCell>Material Name</TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Serial Number</TableCell>
                      <TableCell>Cost Center</TableCell>
                      <TableCell>PR Number</TableCell>
                      <TableCell>PO Number</TableCell>
                      <TableCell>Quotation Date</TableCell>
                      <TableCell>Cost Without</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Vendor Delivery</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Created By Ses</TableCell>
                      <TableCell>Remarks</TableCell>
                      <TableCell>Action</TableCell>
                    </TableHeader>
                    {vendorRepairFiltered.map((repair, index) => (
                      <TableRow key={repair.id}>
                        {showCheckboxes && (
                          <TableCell className="text-center">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(repair.id)}
                              onChange={() => handleSelectRow(repair.id)}
                            />
                          </TableCell>
                        )}
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{formatDate(repair.repair_date)}</TableCell>
                        <TableCell>{repair.ticket_number}</TableCell>
                        <TableCell>{repair.ageing}</TableCell>
                        <TableCell>{repair.engineer_name}</TableCell>
                        <TableCell>{repair.username}</TableCell>
                        <TableCell>{repair.bu_name}</TableCell>
                        <TableCell>{repair.material_name}</TableCell>
                        <TableCell>{repair.brand}</TableCell>
                        <TableCell>{repair.type}</TableCell>
                        <TableCell>{repair.serial_number}</TableCell>
                        <TableCell>{repair.cost_center}</TableCell>
                        <TableCell>{repair.pr_number}</TableCell>
                        <TableCell>{repair.po_number}</TableCell>
                        <TableCell>
                          {formatDate(repair.quotation_date)}
                        </TableCell>
                        <TableCell>{repair.cost_without}</TableCell>
                        <TableCell>{repair.status}</TableCell>
                        <TableCell>{repair.vendor_delivery}</TableCell>
                        <TableCell>{formatDate(repair.date)}</TableCell>
                        <TableCell>{repair.created_by_ses}</TableCell>
                        <TableCell>{repair.remarks}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center space-x-1">
                            <button
                              onClick={() => handleEdit(repair)}
                              className="px-2 py-1 text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-md hover:bg-blue-700 hover:shadow-lg hover:scale-105"
                            >
                              <Pencil size={16} strokeWidth={1} />
                            </button>
                            <button
                              onClick={() => handleDelete(repair.id)}
                              className="px-2 py-1 text-white transition duration-300 ease-in-out transform bg-red-500 rounded-md hover:bg-red-700 hover:shadow-lg hover:scale-105"
                            >
                              <Trash2 size={16} strokeWidth={1} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </div>
              </div>

              <div className="flex items-center justify-center mt-2">
                <button
                  onClick={scrollLeft}
                  className="px-4 py-2 mr-2 text-white bg-gray-300 rounded-md hover:bg-gray-600"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={scrollRight}
                  className="px-4 py-2 text-white bg-gray-300 rounded-md hover:bg-gray-600"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {isFormVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="h-full max-w-3xl p-8 mx-2 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-center">
                      {form.id ? "Edit Vendor Repair" : "Add Vendor Repair"}
                    </h2>
                    <form
                      onSubmit={handleSubmit}
                      className="grid grid-cols-3 gap-6"
                    >
                      <div className="col-span-1">
                        <label htmlFor="repair_date">Repair Date</label>
                        <input
                          type="date"
                          id="repair_date"
                          name="repair_date"
                          value={form.repair_date}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="ticket_number">Ticket Number</label>
                        <input
                          type="text"
                          id="ticket_number"
                          name="ticket_number"
                          value={form.ticket_number}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="ageing">Ageing</label>
                        <input
                          type="text"
                          id="ageing"
                          name="ageing"
                          value={form.ageing}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="engineer_name">Engineer Name</label>
                        <input
                          type="text"
                          id="engineer_name"
                          name="engineer_name"
                          value={form.engineer_name}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={form.username}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="bu_name">BU Name</label>
                        <input
                          type="text"
                          id="bu_name"
                          name="bu_name"
                          value={form.bu_name}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="material_name">Material Name</label>
                        <input
                          type="text"
                          id="material_name"
                          name="material_name"
                          value={form.material_name}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="brand">Brand</label>
                        <input
                          type="text"
                          id="brand"
                          name="brand"
                          value={form.brand}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="type">Type</label>
                        <input
                          type="text"
                          id="type"
                          name="type"
                          value={form.type}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="serial_number">Serial Number</label>
                        <input
                          type="text"
                          id="serial_number"
                          name="serial_number"
                          value={form.serial_number}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="cost_center">Cost Center</label>
                        <input
                          type="text"
                          id="cost_center"
                          name="cost_center"
                          value={form.cost_center}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="pr_number">PR Number</label>
                        <input
                          type="text"
                          id="pr_number"
                          name="pr_number"
                          value={form.pr_number}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="po_number">PO Number</label>
                        <input
                          type="text"
                          id="po_number"
                          name="po_number"
                          value={form.po_number}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="quotation_date">Quotation Date</label>
                        <input
                          type="date"
                          id="quotation_date"
                          name="quotation_date"
                          value={form.quotation_date}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="cost_without">Cost Without</label>
                        <input
                          type="text"
                          id="cost_without"
                          name="cost_without"
                          value={form.cost_without}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="status">Status</label>
                        <select
                          id="status"
                          name="status"
                          value={form.status}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        >
                          <option>Select Status</option>
                          <option value="Repair">Repair</option>
                          <option value="Finished">Finished</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="vendor_delivery">Vendor Delivery</label>
                        <input
                          type="text"
                          id="vendor_delivery"
                          name="vendor_delivery"
                          value={form.vendor_delivery}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="date">Date</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={form.date}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="created_by_ses">Created By Ses</label>
                        <input
                          type="text"
                          id="created_by_ses"
                          name="created_by_ses"
                          value={form.created_by_ses}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="remarks">Remarks</label>
                        <input
                          type="text"
                          id="remarks"
                          name="remarks"
                          value={form.remarks}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          disabled={isTicketNumberDuplicate}
                        />
                      </div>
                      <div className="flex justify-end col-span-3 mt-4 space-x-4">
                        <button
                          type="submit"
                          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={toggleForm}
                          className="px-4 py-2 text-red-500 hover:text-red-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {isImportFormVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="w-full p-8 mx-4 bg-white border border-gray-300 rounded-md shadow-md h-90 max-w-96">
                    <h2 className="mb-4 text-xl font-semibold text-center">
                      Upload Excel File
                    </h2>
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                      className="block w-full p-3 mb-4 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex justify-between mt-4">
                      <a
                        href="../../../../public/excel/vendor repair (1).xlsx"
                        download
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        Download Template
                      </a>

                      <button
                        onClick={toggleImportForm}
                        className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorRepairComponent;