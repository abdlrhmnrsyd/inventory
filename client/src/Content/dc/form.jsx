<form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
...
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "active" ? "bg-yellow-100" : ""
     }`}
     value={form.active}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "add_in_solarwinds" ? "bg-yellow-100" : ""
     }`}
     value={form.add_in_solarwinds}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "application_owner" ? "bg-yellow-100" : ""
     }`}
     value={form.application_owner}
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
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "asset_category" ? "bg-yellow-100" : ""
     }`}
     value={form.asset_category}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "asset_number" ? "bg-yellow-100" : ""
     }`}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "asset_tag_number" ? "bg-yellow-100" : ""
     }`}
     value={form.asset_tag_number}
     onChange={handleInputChange}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "brand" ? "bg-yellow-100" : ""
     }`}
     value={form.brand}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "bu" ? "bg-yellow-100" : ""
     }`}
     value={form.bu}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "cd_dvd" ? "bg-yellow-100" : ""
     }`}
     value={form.cd_dvd}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "cost_local_currency" ? "bg-yellow-100" : ""
     }`}
     value={form.cost_local_currency}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "criticality_rating" ? "bg-yellow-100" : ""
     }`}
     value={form.criticality_rating}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "date_disposed" ? "bg-yellow-100" : ""
     }`}
     value={form.date_disposed}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "deposit_cyberark" ? "bg-yellow-100" : ""
     }`}
     value={form.deposit_cyberark}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "domain" ? "bg-yellow-100" : ""
     }`}
     value={form.domain}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "druva" ? "bg-yellow-100" : ""
     }`}
     value={form.druva}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "fde" ? "bg-yellow-100" : ""
     }`}
     value={form.fde}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "hard_disk" ? "bg-yellow-100" : ""
     }`}
     value={form.hard_disk}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "host_name" ? "bg-yellow-100" : ""
     }`}
     value={form.host_name}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "ilo" ? "bg-yellow-100" : ""
     }`}
     value={form.ilo}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "indicate_which_currency" ? "bg-yellow-100" : ""
     }`}
     value={form.indicate_which_currency}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "ip_address" ? "bg-yellow-100" : ""
     }`}
     value={form.ip_address}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "job_title" ? "bg-yellow-100" : ""
     }`}
     value={form.job_title}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "mac_address" ? "bg-yellow-100" : ""
     }`}
     value={form.mac_address}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "model" ? "bg-yellow-100" : ""
     }`}
     value={form.model}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "ms_office_version" ? "bg-yellow-100" : ""
     }`}
     value={form.ms_office_version}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "number_of_physical_processor" ? "bg-yellow-100" : ""
     }`}
     value={form.number_of_physical_processor}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "os_version" ? "bg-yellow-100" : ""
     }`}
     value={form.os_version}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "part_number_harddisk" ? "bg-yellow-100" : ""
     }`}
     value={form.part_number_harddisk}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "po_purchase_material" ? "bg-yellow-100" : ""
     }`}
     value={form.po_purchase_material}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "po_renewal_maintenance_contract" ? "bg-yellow-100" : ""
     }`}
     value={form.po_renewal_maintenance_contract}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "ram" ? "bg-yellow-100" : ""
     }`}
     value={form.ram}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "remarks" ? "bg-yellow-100" : ""
     }`}
     value={form.remarks}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "server_ownership" ? "bg-yellow-100" : ""
     }`}
     value={form.server_ownership}
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
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "server_role" ? "bg-yellow-100" : ""
     }`}
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
     htmlFor="site"
     className="block mb-1 font-medium text-gray-700"
   >
     Site
   </label>
   <input
     type="text"
     id="site"
     name="site"
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "site" ? "bg-yellow-100" : ""
     }`}
     value={form.site}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "system_owner" ? "bg-yellow-100" : ""
     }`}
     value={form.system_owner}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "total_core" ? "bg-yellow-100" : ""
     }`}
     value={form.total_core}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "user" ? "bg-yellow-100" : ""
     }`}
     value={form.user}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "usb_disabled" ? "bg-yellow-100" : ""
     }`}
     value={form.usb_disabled}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "utilization_storage" ? "bg-yellow-100" : ""
     }`}
     value={form.utilization_storage}
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
    
     className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "warranty_start_date" ? "bg-yellow-100" : ""
     }`}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "end_date" ? "bg-yellow-100" : ""
     }`}
     value={form.end_date}
     onChange={handleInputChange}
   />
 </div>

 <div>
   <label
     htmlFor="date_purchased"
     className="block mb-1 font-medium text-gray-700"
   >
     Date Purchased (YYMMDD)
   </label>
   <input
     type="date"
     id="date_purchased"
     name="date_purchased"
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "date_purchased" ? "bg-yellow-100" : ""
     }`}
     value={form.date_purchased}
     onChange={handleInputChange}
   />
 </div>

 <div>
   <label
     htmlFor="eosl_date"
     className="block mb-1 font-medium text-gray-700"
   >
     EOSL date
   </label>
   <input
     type="date"
     id="eosl_date"
     name="eosl_date"
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "eosl_date" ? "bg-yellow-100" : ""
     }`}
     value={form.eosl_date}
     onChange={handleInputChange}
   />
 </div>

 <div>
   <label
     htmlFor="planned_refresh_date"
     className="block mb-1 font-medium text-gray-700"
   >
     Planned refresh date
   </label>
   <input
     type="date"
     id="planned_refresh_date"
     name="planned_refresh_date"
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "planned_refresh_date" ? "bg-yellow-100" : ""
     }`}
     value={form.planned_refresh_date}
     onChange={handleInputChange}
   />
 </div>

 <div>
   <label
     htmlFor="eosl_status"
     className="block mb-1 font-medium text-gray-700"
   >
     EOSL status
   </label>
   <input
     type="text"
     id="eosl_status"
     name="eosl_status"
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "eosl_status" ? "bg-yellow-100" : ""
     }`}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "cip" ? "bg-yellow-100" : ""
     }`}
     value={form.cip}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "power_supply_model" ? "bg-yellow-100" : ""
     }`}
     value={form.power_supply_model}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "power_supply_model_description" ? "bg-yellow-100" : ""
     }`}
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
     type="text"
     id="power_consumption"
     name="power_consumption"
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "power_consumption" ? "bg-yellow-100" : ""
     }`}
     value={form.power_consumption}
     onChange={handleInputChange}
   />
 </div>

 <div>
   <label
     htmlFor="btu_hour"
     className="block mb-1 font-medium text-gray-700"
   >
     BTU/ hour
   </label>
   <input
     type="number"
     id="btu_hour"
     name="btu_hour"
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "btu_hour" ? "bg-yellow-100" : ""
     }`}
     value={form.btu_hour}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "core_each_processor" ? "bg-yellow-100" : ""
     }`}
     value={form.core_each_processor}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "cpu" ? "bg-yellow-100" : ""
     }`}
     value={form.cpu}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "dr_enable" ? "bg-yellow-100" : ""
     }`}
     value={form.dr_enable}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "business_unit" ? "bg-yellow-100" : ""
     }`}
     value={form.business_unit}
     onChange={handleInputChange}
   />
 </div>

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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "rack" ? "bg-yellow-100" : ""
     }`}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "seq" ? "bg-yellow-100" : ""
     }`}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "type" ? "bg-yellow-100" : ""
     }`}
     value={form.type}
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
    
    className={`w-full p-1 border border-gray-300 rounded-md ${
       searchFieldTerm === "cost_usd" ? "bg-yellow-100" : ""
     }`}
     value={form.cost_usd}
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