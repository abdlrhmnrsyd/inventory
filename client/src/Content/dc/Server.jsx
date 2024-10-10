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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"; // Added Chevron imports
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react"; // Added useRef
import Navbar from "../../components/Navbar";
import NavbarItem from "../../components/NavbarItem";
import Table from "../../components/Table";
import TableRow from "../../components/TableRow";
import TableHeader from "../../components/TableHeader";
import TableCell from "../../components/TableCell";
import ProfileCard from "../../components/ProfileCard";
import axios from "axios";
import Swal from "sweetalert2";

function ServerComponent() {
  const [servers, setServers] = useState([]); // Assuming you have a state for servers
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const tableContainerRef = useRef(null); // Reference for the table container
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const [isFormVisible, setIsFormVisible] = useState(false); // State untuk form visibility
  const [searchField, setSearchField] = useState(""); // State for search field
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State untuk mengontrol visibilitas input pencarian
  const [form, setForm] = useState({
    // State for form data
    rack: "",
    seq: "",
    type: "",
    active: "",
    asset_category: "",
    asset_number: "",
    asset_tag_number: "",
    site: "",
    location: "",
    user: "",
    job_title: "",
    bu: "",
    domain: "",
    deposit_cyberark: "",
    server_ownership: "",
    application_owner: "",
    system_owner: "",
    business_unit: "",
    add_in_solarwinds: "",
    server_role: "",
    brand: "",
    mac_address: "",
    hostName: "",
    ip_address: "",
    ilo: "",
    model: "",
    serial_no: "",
    physical_virtual: "",
    power_supply_model: "",
    eosl_date: "",
    planned_refresh_date: "",
    eosl_status: "",
    cip: "",
    date_purchased: "",
    power_supply_model_description: "",
    power_consumption: "",
    btu_hour: "",
    po_renewal_maintenance_contract: "",
    po_purchase_material: "",
    cost_local_currency: "",
    indicate_which_currency: "",
    cost_usd: "",
    utilization_storage: "",
    criticalityRating: "",
    dr_enable: "",
    warranty_start_date: "",
    end_date: "",
    date_disposed: "",
    core_each_processor: "",
    number_of_physical_processor: "",
    total_core: "",
    cpu: "",
    ram: "",
    hard_disk: "",
    part_number_harddisk: "",
    usb_disabled: "",
    cd_dvd: "",
    os_version: "",
    remarks: "",
    ms_office_version: "",
    druva: "",
    ip_guard: "",
    fde: "",
  });
  const [devices, setDevices] = useState([]); // Define devices state
  
  const handleAddDevice = () => {
    setForm({}); // Reset form to initial values
    setIsFormVisible(true); // Show the form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEdit = (server) => {
    setForm(server); // Mengisi form dengan data server yang dipilih
    setIsFormVisible(true); // Menampilkan form
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   

    // Validasi dan konversi nilai boolean
    const isActive = form.active === "true" || form.active === true; // Pastikan ini adalah boolean

    const dataToInsert = {
      ...form,
      active: isActive, // Pastikan nilai active adalah boolean
    };

    console.log("Data to insert:", dataToInsert); // Log data yang akan dimasukkan

    // Lanjutkan dengan operasi INSERT
    axios
      .post("http://localhost:3001/server", dataToInsert)
      .then(() => {
        Swal.fire("Created!", "The server has been created.", "success");
        fetchServers(); // Refresh the server list
        setForm({}); // Reset form after submission
        setIsFormVisible(false); // Hide the form
      })
      .catch((err) => {
        console.error("Error creating server:", err); // Log kesalahan
        Swal.fire("Error!", "There was an error creating the server.", "error");
      });
  };

 const toggleForm  = () => {
    setIsFormVisible(!isFormVisible); // Mengubah visibilitas form
  };

  useEffect(() => {
    fetchServers(); // Fetch server data
  }, []);

  const fetchServers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/server");
      setServers(response.data);
      console.log("Data fetched:", response.data); // Log data yang diterima
    } catch (err) {
      console.error("Error fetching servers:", err);
    }
  };

  const scrollLeft = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: -1000, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({ left: 1000, behavior: "smooth" });
    }
  };

  const filteredServers = servers.filter((server) => {
    console.log("Filtering server:", server); // Log setiap server yang difilter
    return (
      (server.type &&
        server.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (server.ip_address &&
        server.ip_address.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  //select delete rows
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  // Function to handle row selection
  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    if (showCheckboxes) {
      setSelectedRows([]); // Clear selected rows when hiding checkboxes
      setSelectAll(false); // Reset Select All when hiding checkboxes
    }
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]); // Deselect all rows
    } else {
      setSelectedRows(serverFiltered.map((server) => server.id)); // Select all rows
    }
    setSelectAll(!selectAll); // Toggle Select All state
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  // Function to handle deletion of selected rows
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
            axios.delete(`http://localhost:3001/server/${id}`)
          )
        );
        Swal.fire({
          title: "Deleted!",
          text: `${selectedRows.length} licenses removed successfully.`,
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchServers();
        setSelectedRows([]); // Clear selected rows after deletion
      } catch (err) {
        console.error(err.message);
      }
    } else {
      // Clear selected rows if user cancels
      setSelectedRows([]);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      showAlert("No file selected", true);
      return;
    }

    const result = await Swal.fire({
      title: "Confirm Upload",
      text: `Are you sure you want to upload the file: ${file.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, upload it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const bstr = event.target.result;
          const workbook = XLSX.read(bstr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          console.log("Parsed Excel data:", data);

          const response = await axios.post(
            "http://localhost:3001/server/import",
            data
          );
          console.log("Server response:", response.data);
          showAlert("Data imported successfully!");
          fetchMicrosoft();
          setUploadVisible(false); // Menutup form upload setelah berhasil
        } catch (error) {
          console.error("Error importing data:", error);
          showAlert(
            `Error importing data: ${error.message}. Please check the console for details.`,
            true
          );
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        showAlert("Error reading file. Please try again.", true);
      };

      reader.readAsBinaryString(file);
    }
  };
  const [isUploadVisible, setUploadVisible] = useState(false); // State untuk menampilkan form upload

  const toggleUploadForm = () => {
    setUploadVisible(!isUploadVisible);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to delete this server?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/server/${id}`);
        Swal.fire("Deleted!", "The server has been deleted.", "success");
        fetchServers(); // Refresh the server list
      } catch (err) {
        console.error("Error deleting server:", err);
        Swal.fire("Error!", "There was an error deleting the server.", "error");
      }
    }
  };

  //format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
            <div class="relative inline-block text-left">
              <div class="group">
                <button
                  type="button"
                  class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Management
                  <svg
                    class="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>

                <div class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                  <div class="py-1">
                    <Link
                      to="/summary"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Summary
                    </Link>
                    <Link
                      to="/master"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Master
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative inline-block text-left">
              <div class="group">
                <button
                  type="button"
                  class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Tape
                  <svg
                    class="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>

                <div class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                  <div class="py-1">
                    <Link
                      to="/tape_driver"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Driver
                    </Link>
                    <Link
                      to="/tape_library"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Lbrary
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative inline-block text-left">
              <div class="group">
                <button
                  type="button"
                  class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Server
                  <svg
                    class="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>

                <div class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                  <div class="py-1">
                    <Link
                      to="/server"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Server
                    </Link>
                    <Link
                      to="/decom_server"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Decom Server
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative inline-block text-left">
              <div class="group">
                <button
                  type="button"
                  class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Management
                  <svg
                    class="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>

                <div class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                  <div class="py-1">
                    <Link
                      to="/storage"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Storage
                    </Link>
                    <Link
                      to="/switch"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Switch
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative inline-block text-left">
              <div class="group">
                <button
                  type="button"
                  class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Management
                  <svg
                    class="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>

                <div class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                  <div class="py-1">
                    <Link
                      to="/ruter"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Router
                    </Link>
                    <Link
                      to="/pmis"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Pmis
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative inline-block text-left">
              <div class="group">
                <button
                  type="button"
                  class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Device
                  <svg
                    class="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>

                <div class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                  <div class="py-1">
                    <Link
                      to="/security_device"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Security Device
                    </Link>
                    <Link
                      to="/monitoring_device"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Monitoring Device
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative inline-block text-left">
              <div class="group">
                <button
                  type="button"
                  class="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  Infrastructure
                  <svg
                    class="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>

                <div class="absolute left-0 w-40 mt-1 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                  <div class="py-1">
                    <Link
                      to="/firewall"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Firewall
                    </Link>
                    <Link
                      to="/dc_utility_equipment"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dc Utility Equipment
                    </Link>
                    <Link
                      to="/fiber_optik"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Fiber Optik
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAddDevice} // Memanggil fungsi toggleForm untuk menampilkan form
                    className="px-4 py-2 text-white transition duration-200 ease-in-out bg-blue-500 rounded-md hover:bg-blue-700"
                  >
                    Add New Server
                  </button>
                  <button
                    onClick={toggleUploadForm} // Mengubah fungsi untuk menampilkan form upload
                    className="px-4 py-2 text-white transition duration-200 ease-in-out bg-green-500 rounded-md hover:bg-green-700"
                  >
                    Import Excel
                  </button>
                </div>
              </div>

              {isUploadVisible && ( // Menampilkan form upload jika isUploadVisible true
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
                        href="../../../public/excel/microsoft.xlsx"
                        download
                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        Download Template
                      </a>

                      <button
                        onClick={toggleUploadForm}
                        className="px-4 py-2 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className="overflow-x-auto max-h-96"
              style={{ overflowY: "scroll", overflowX: "auto" }} // Ensure horizontal overflow is enabled
              ref={tableContainerRef} // Attach ref to the table container
            >
              <div style={{ width: "10500px" }}>
                <Table style={{ minWidth: "10500px" }}>
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
                    <TableCell>Rack #</TableCell>
                    <TableCell>Seq #</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Asset Category</TableCell>
                    <TableCell>Asset Number (SAP)</TableCell>
                    <TableCell>Asset Tag Number</TableCell>
                    <TableCell>Site</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Job Title/Role</TableCell>
                    <TableCell>BU / BG</TableCell>
                    <TableCell>Domain</TableCell>
                    <TableCell>Deposit CyberArk</TableCell>
                    <TableCell>SERVER OWNERSHIP / Managed by</TableCell>
                    <TableCell>Application Owner</TableCell>
                    <TableCell>System Owner</TableCell>
                    <TableCell>Business Unit</TableCell>
                    <TableCell>Add in Solarwinds</TableCell>
                    <TableCell>Server Role</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>MAC Address</TableCell>
                    <TableCell>Host Name</TableCell>
                    <TableCell>IP Address</TableCell>
                    <TableCell>iLO</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Serial No.</TableCell>
                    <TableCell>Physical / virtual</TableCell>
                    <TableCell>Power Supply Model</TableCell>
                    <TableCell>EOSL date</TableCell>
                    <TableCell>Planned refresh date</TableCell>
                    <TableCell>EOSL status</TableCell>
                    <TableCell>CIP #</TableCell>
                    <TableCell>Date Purchased (YYMMDD)</TableCell>
                    <TableCell>Power Supply Model Description</TableCell>
                    <TableCell>Power Consumption</TableCell>
                    <TableCell>BTU/ hour</TableCell>
                    <TableCell>PO Renewal Maintenance Contract</TableCell>
                    <TableCell>PO Purchase Material #</TableCell>
                    <TableCell>Cost (Local Currency)</TableCell>
                    <TableCell>Indicate Which currency</TableCell>
                    <TableCell>Cost (USD)</TableCell>
                    <TableCell>UTILIZATION STORAGE</TableCell>
                    <TableCell>CRITICALITY RATING</TableCell>
                    <TableCell>DR ENABLE</TableCell>
                    <TableCell>WARRANTY START DATE</TableCell>
                    <TableCell>END DATE</TableCell>
                    <TableCell>DATE DISPOSED</TableCell>
                    <TableCell>CORE EACH PROCESSOR</TableCell>
                    <TableCell>NUMBER OF PHYSICAL PROCESSOR</TableCell>
                    <TableCell>TOTAL CORE</TableCell>
                    <TableCell>CPU</TableCell>
                    <TableCell>RAM</TableCell>
                    <TableCell>HARD DISK</TableCell>
                    <TableCell>PART NUMBER HARDDISK</TableCell>
                    <TableCell>USB DISABLED</TableCell>
                    <TableCell>CD/DVD</TableCell>
                    <TableCell>OS VERSION</TableCell>
                    <TableCell>REMARKS</TableCell>
                    <TableCell>MS OFFICE VERSION</TableCell>
                    <TableCell>DRUVA</TableCell>
                    <TableCell>IP GUARD</TableCell>
                    <TableCell>FDE</TableCell>
                    <TableCell>ACTION</TableCell>
                  </TableHeader>

                  {filteredServers.map((server, index) => (
                    <TableRow key={server.id}>
                      {showCheckboxes && (
                        <TableCell className="text-center">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(server.id)}
                            onChange={() => handleSelectRow(server.id)}
                          />
                        </TableCell>
                      )}
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell>{server.rack}</TableCell>
                      <TableCell>{server.seq}</TableCell>
                      <TableCell>{server.type}</TableCell>
                      <TableCell>{server.active}</TableCell>
                      <TableCell>{server.asset_category}</TableCell>
                      <TableCell>{server.asset_number}</TableCell>
                      <TableCell>{server.asset_tag_number}</TableCell>
                      <TableCell>{server.site}</TableCell>
                      <TableCell>{server.location}</TableCell>
                      <TableCell>{server.user}</TableCell>
                      <TableCell>{server.job_title}</TableCell>
                      <TableCell>{server.bu}</TableCell>
                      <TableCell>{server.domain}</TableCell>
                      <TableCell>{server.deposit_cyberark}</TableCell>
                      <TableCell>{server.server_ownership}</TableCell>
                      <TableCell>{server.application_owner}</TableCell>
                      <TableCell>{server.system_owner}</TableCell>
                      <TableCell>{server.business_unit}</TableCell>
                      <TableCell>{server.add_in_solarwinds}</TableCell>
                      <TableCell>{server.server_role}</TableCell>
                      <TableCell>{server.brand}</TableCell>
                      <TableCell>{server.mac_address}</TableCell>
                      <TableCell>{server.host_name}</TableCell>
                      <TableCell>{server.ip_address}</TableCell>
                      <TableCell>{server.ilo}</TableCell>
                      <TableCell>{server.model}</TableCell>
                      <TableCell>{server.serial_no}</TableCell>
                      <TableCell>{server.physical_virtual}</TableCell>
                      <TableCell>{server.power_supply_model}</TableCell>
                      <TableCell>{formatDate(server.eosl_date)}</TableCell>
                      <TableCell>
                        {formatDate(server.planned_refresh_date)}
                      </TableCell>
                      <TableCell>{server.eosl_status}</TableCell>
                      <TableCell>{server.cip}</TableCell>
                      <TableCell>{formatDate(server.date_purchased)}</TableCell>
                      <TableCell>
                        {server.power_supply_model_description}
                      </TableCell>
                      <TableCell>{server.power_consumption}</TableCell>
                      <TableCell>{server.btu_hour}</TableCell>
                      <TableCell>
                        {server.po_renewal_maintenance_contract}
                      </TableCell>
                      <TableCell>{server.po_purchase_material}</TableCell>
                      <TableCell>{server.cost_local_currency}</TableCell>
                      <TableCell>{server.indicate_which_currency}</TableCell>
                      <TableCell>{server.cost_usd}</TableCell>
                      <TableCell>{server.utilization_storage}</TableCell>
                      <TableCell>{server.criticality_rating}</TableCell>
                      <TableCell>{server.dr_enable}</TableCell>
                      <TableCell>{formatDate(server.warranty_start_date)}</TableCell>
                      <TableCell>{formatDate(server.end_date)}</TableCell>
                      <TableCell>{formatDate(server.date_disposed)}</TableCell>
                      <TableCell>{server.core_each_processor}</TableCell>
                      <TableCell>
                        {server.number_of_physical_processor}
                      </TableCell>
                      <TableCell>{server.total_core}</TableCell>
                      <TableCell>{server.cpu}</TableCell>
                      <TableCell>{server.ram}</TableCell>
                      <TableCell>{server.hard_disk}</TableCell>
                      <TableCell>{server.part_number_harddisk}</TableCell>
                      <TableCell>{server.usb_disabled}</TableCell>
                      <TableCell>{server.cd_dvd}</TableCell>
                      <TableCell>{server.os_version}</TableCell>
                      <TableCell>{server.remarks}</TableCell>
                      <TableCell>{server.ms_office_version}</TableCell>
                      <TableCell>{server.druva}</TableCell>
                      <TableCell>{server.ip_guard}</TableCell>
                      <TableCell>{server.fde}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-1">
                          <button
                            onClick={() => handleEdit(server)}
                            className="px-2 py-1 text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-md hover:bg-blue-700 hover:shadow-lg hover:scale-105"
                          >
                            <Pencil size={16} strokeWidth={1} />
                          </button>
                          <button
                            onClick={() => handleDelete(server.id)}
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
          </div>
        </div>
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-5xl p-8 mx-2 bg-white border border-gray-300 rounded-md shadow-md">
            <h2 className="mb-2 text-lg font-semibold text-center">
              Add New Server
            </h2>
            <div className="overflow-y-auto h-96">
              <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="rack"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Rack #
                  </label>
                  <input
                    type="text"
                    id="rack"
                    name="rack"
                    placeholder="Rack #"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.rack}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="seq"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Seq #
                  </label>
                  <input
                    type="text"
                    id="seq"
                    name="seq"
                    placeholder="Seq #"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.seq}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    placeholder="Type"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.type}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="active"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Active
                  </label>
                  <input
                    type="text"
                    id="active"
                    name="active"
                    placeholder="Active"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.active}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="asset_category"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Asset Category
                  </label>
                  <select
                    id="asset_category"
                    name="asset_category"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.sset_category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="Server">Server</option>
                    <option value="Network Device">Network Device</option>
                    <option value="Storage">Storage</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="asset_number"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Asset Number
                  </label>
                  <input
                    type="text"
                    id="asset_number"
                    name="asset_number"
                    placeholder="Asset Number"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.asset_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="asset_tag_number"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Asset Tag Number
                  </label>
                  <input
                    type="text"
                    id="asset_tag_number"
                    name="asset_tag_number"
                    placeholder="Asset Tag Number"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.asset_tag_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="site"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Site
                  </label>
                  <input
                    type="text"
                    id="site"
                    name="site"
                    placeholder="Site"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.site}
                    onChange={handleInputChange}
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
                  />
                </div>
                <div>
                  <label
                    htmlFor="user"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    User
                  </label>
                  <input
                    type="text"
                    id="user"
                    name="user"
                    placeholder="User"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.user}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="job_title"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="job_title"
                    name="job_title"
                    placeholder="Job Title"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.job_title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="bu"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    BU / BG
                  </label>
                  <input
                    type="text"
                    id="bu"
                    name="bu"
                    placeholder="BU / BG"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.bu}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="domain"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Domain
                  </label>
                  <input
                    type="text"
                    id="domain"
                    name="domain"
                    placeholder="Domain"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.domain}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="deposit_cyberark"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Deposit CyberArk
                  </label>
                  <input
                    type="text"
                    id="deposit_cyberark"
                    name="deposit_cyberark"
                    placeholder="Deposit CyberArk"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.deposit_cyberark}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="server_ownership"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Server Ownership
                  </label>
                  <input
                    type="text"
                    id="server_ownership"
                    name="server_ownership"
                    placeholder="Server Ownership"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.server_ownership}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="application_owner"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Application Owner
                  </label>
                  <input
                    type="text"
                    id="application_owner"
                    name="application_owner"
                    placeholder="Application Owner"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.application_owner}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="system_owner"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    System Owner
                  </label>
                  <input
                    type="text"
                    id="system_owner"
                    name="system_owner"
                    placeholder="System Owner"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.system_owner}
                    onChange={handleInputChange}
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
                  />
                </div>
                <div>
                  <label
                    htmlFor="add_in_solarwinds"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Add in Solarwinds
                  </label>
                  <input
                    type="text"
                    id="add_in_solarwinds"
                    name="add_in_solarwinds"
                    placeholder="Add in Solarwinds"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.add_in_solarwinds}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="server_role"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Server Role
                  </label>
                  <select
                    id="server_role"
                    name="server_role"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.server_role}
                    onChange={handleInputChange}
                  >
                    <option value="">Select </option>
                    <option value="Application Server">
                      Application Server
                    </option>
                    <option value="Web Server">Web Server</option>
                    <option value="Database Server">Database Server</option>
                  </select>
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
                  />
                </div>
                <div>
                  <label
                    htmlFor="mac_address"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    MAC Address
                  </label>
                  <input
                    type="text"
                    id="mac_address"
                    name="mac_address"
                    placeholder="MAC Address"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.mac_address}
                    onChange={handleInputChange}
                  />
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
                  />
                </div>
                <div>
                  <label
                    htmlFor="ilo"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    iLO
                  </label>
                  <input
                    type="text"
                    id="ilo"
                    name="ilo"
                    placeholder="iLO"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.ilo}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="model"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    placeholder="Model"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.model}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="serial_no"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Serial No.
                  </label>
                  <input
                    type="text"
                    id="serial_no"
                    name="serial_no"
                    placeholder="Serial No."
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.serial_no}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="physical_virtual"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Physical / Virtual
                  </label>
                  <input
                    type="text"
                    id="physical_virtual"
                    name="physical_virtual"
                    placeholder="Physical / Virtual"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.physical_virtual}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="power_supply_model"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Power Supply Model
                  </label>
                  <input
                    type="text"
                    id="power_supply_model"
                    name="power_supply_model"
                    placeholder="Power Supply Model"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.power_supply_model}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="eosl_date"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    EOSL Date
                  </label>
                  <input
                    type="date"
                    id="eosl_date"
                    name="eosl_date"
                    placeholder="EOSL Date"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.eosl_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="planned_refresh_date"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Planned Refresh Date
                  </label>
                  <input
                    type="date"
                    id="planned_refresh_date"
                    name="planned_refresh_date"
                    placeholder="Planned Refresh Date"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.planned_refresh_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="eosl_status"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    EOSL Status
                  </label>
                  <input
                    type="text"
                    id="eosl_status"
                    name="eosl_status"
                    placeholder="EOSL Status"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.eosl_status}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="cip"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    CIP #
                  </label>
                  <input
                    type="text"
                    id="cip"
                    name="cip"
                    placeholder="CIP #"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.cip}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="date_purchased"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Date Purchased
                  </label>
                  <input
                    type="date"
                    id="date_purchased"
                    name="date_purchased"
                    placeholder="Date Purchased"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.date_purchased}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="power_supply_model_description"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Power Supply Model Description
                  </label>
                  <input
                    type="text"
                    id="power_supply_model_description"
                    name="power_supply_model_description"
                    placeholder="Power Supply Model Description"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.power_supply_model_description}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="power_consumption"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Power Consumption
                  </label>
                  <input
                    type="number"
                    id="power_consumption"
                    name="power_consumption"
                    placeholder="Power Consumption"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.power_consumption}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="btu_hour"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    BTU / Hour
                  </label>
                  <input
                    type="number"
                    id="btu_hour"
                    name="btu_hour"
                    placeholder="BTU / Hour"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.btu_hour}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="po_renewal_maintenance_contract"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    PO Renewal Maintenance Contract
                  </label>
                  <input
                    type="text"
                    id="po_renewal_maintenance_contract"
                    name="po_renewal_maintenance_contract"
                    placeholder="PO Renewal Maintenance Contract"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.po_renewal_maintenance_contract}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="po_purchase_material"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    PO Purchase Material
                  </label>
                  <input
                    type="text"
                    id="po_purchase_material"
                    name="po_purchase_material"
                    placeholder="PO Purchase Material"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.po_purchase_material}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="cost_local_currency"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Cost (Local Currency)
                  </label>
                  <input
                    type="number"
                    id="cost_local_currency"
                    name="cost_local_currency"
                    placeholder="Cost (Local Currency)"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.cost_local_currency}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="indicate_which_currency"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Indicate Which Currency
                  </label>
                  <input
                    type="text"
                    id="indicate_which_currency"
                    name="indicate_which_currency"
                    placeholder="Indicate Which Currency"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.indicate_which_currency}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="cost_usd"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Cost (USD)
                  </label>
                  <input
                    type="text"
                    id="cost_usd"
                    name="cost_usd"
                    placeholder="Cost (USD)"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.cost_usd}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="utilization_storage"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Utilization Storage
                  </label>
                  <input
                    type="text"
                    id="utilization_storage"
                    name="utilization_storage"
                    placeholder="Utilization Storage"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.utilization_storage}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="criticality_rating"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Criticality Rating
                  </label>
                  <input
                    type="number"
                    id="criticality_rating"
                    name="criticality_rating"
                    placeholder="Criticality Rating"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.criticality_rating}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="dr_enable"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    DR Enable
                  </label>
                  <input
                    type="text"
                    id="dr_enable"
                    name="dr_enable"
                    placeholder="DR Enable"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.dr_enable}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="warranty_start_date"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Warranty Start Date
                  </label>
                  <input
                    type="date"
                    id="warranty_start_date"
                    name="warranty_start_date"
                    placeholder="Warranty Start Date"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.warranty_start_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="end_date"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    placeholder="End Date"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.end_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="date_disposed"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Date Disposed
                  </label>
                  <input
                    type="date"
                    id="date_disposed"
                    name="date_disposed"
                    placeholder="Date Disposed"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.date_disposed}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="core_each_processor"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Core Each Processor
                  </label>
                  <input
                    type="number"
                    id="core_each_processor"
                    name="core_each_processor"
                    placeholder="Core Each Processor"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.core_each_processor}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="number_of_physical_processor"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Number of Physical Processor
                  </label>
                  <input
                    type="number"
                    id="number_of_physical_processor"
                    name="number_of_physical_processor"
                    placeholder="Number of Physical Processor"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.number_of_physical_processor}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="total_core"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Total Core
                  </label>
                  <input
                    type="text"
                    id="total_core"
                    name="total_core"
                    placeholder="Total Core"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.total_core}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="cpu"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    CPU
                  </label>
                  <input
                    type="text"
                    id="cpu"
                    name="cpu"
                    placeholder="CPU"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.cpu}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="ram"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    RAM
                  </label>
                  <input
                    type="number"
                    id="ram"
                    name="ram"
                    placeholder="RAM"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.ram}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="hard_disk"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Hard Disk
                  </label>
                  <input
                    type="text"
                    id="hard_disk"
                    name="hard_disk"
                    placeholder="Hard Disk"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.hard_disk}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="part_number_harddisk"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Part Number Hard Disk
                  </label>
                  <input
                    type="text"
                    id="part_number_harddisk"
                    name="part_number_harddisk"
                    placeholder="Part Number Hard Disk"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.part_number_harddisk}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="usb_disabled"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    USB Disabled
                  </label>
                  <input
                    type="text"
                    id="usb_disabled"
                    name="usb_disabled"
                    placeholder="USB Disabled"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.usb_disabled}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="cd_dvd"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    CD/DVD
                  </label>
                  <input
                    type="text"
                    id="cd_dvd"
                    name="cd_dvd"
                    placeholder="CD/DVD"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.cd_dvd}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="os_version"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    OS Version
                  </label>
                  <input
                    type="text"
                    id="os_version"
                    name="os_version"
                    placeholder="OS Version"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.os_version}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="remarks"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Remarks
                  </label>
                  <input
                    type="textarea"
                    id="remarks"
                    name="remarks"
                    placeholder="Remarks"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.remarks}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="ms_office_version"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    MS Office Version
                  </label>
                  <input
                    type="text"
                    id="ms_office_version"
                    name="ms_office_version"
                    placeholder="MS Office Version"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.ms_office_version}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="druva"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Druva
                  </label>
                  <input
                    type="text"
                    id="druva"
                    name="druva"
                    placeholder="Druva"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.druva}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="ip_guard"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    IP Guard
                  </label>
                  <input
                    type="text"
                    id="ip_guard"
                    name="ip_guard"
                    placeholder="IP Guard"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.ip_guard}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="fde"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    FDE
                  </label>
                  <input
                    type="text"
                    id="fde"
                    name="fde"
                    placeholder="FDE"
                    className="w-full p-1 border border-gray-300 rounded-md"
                    value={form.fde}
                    onChange={handleInputChange}
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
                    onClick={() => setIsFormVisible(false)}
                    className="text-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ServerComponent;
