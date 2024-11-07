const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// PostgreSQL Pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "inventory_db",
  password: "projek",
  port: 5432,
});

// Secret key untuk JWT
const JWT_SECRET = "your_jwt_secret"; // Ganti dengan secret key Anda

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

// User Registration Endpoint
app.post("/register", async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res
      .status(400)
      .json({ message: "Username, password, and name are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, password, name) VALUES ($1, $2, $3)",
      [username, hashedPassword, name]
    );
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "An error occurred during registration." });
  }
});

// Endpoint to fetch user profile
app.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const userQuery = "SELECT username, name FROM users WHERE id = $1";
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(userResult.rows[0]);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error.", details: err.message });
  }
});

// Endpoint to change user password
app.put("/profile/change-password", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { oldPassword, newPassword } = req.body;

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Old password and new password are required." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    // Get current user password
    const userQuery = "SELECT password FROM users WHERE id = $1";
    const userResult = await pool.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = userResult.rows[0];

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedNewPassword,
      userId,
    ]);

    res.json({ message: "Password changed successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

// User Login Endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const userQuery = "SELECT * FROM users WHERE username = $1";
    const userResult = await pool.query(userQuery, [username]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// CRUD Endpoints for PC
app.post("/pc", async (req, res) => {
  const {
    it_code,
    brand,
    serial_number,
    ip_address,
    mac_address,
    host_name,
    location,
    business_unit,
    department,
    username,
    status,
  } = req.body;
  try {
    const newPC = await pool.query(
      "INSERT INTO pc (it_code, brand, serial_number, ip_address, mac_address, host_name, location, business_unit, department, username, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10, $11) RETURNING *",
      [
        it_code,
        brand,
        serial_number,
        ip_address,
        mac_address,
        host_name,
        location,
        business_unit,
        department,
        username,
        status,
      ]
    );

    res.json(newPC.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/pc", async (req, res) => {
  try {
    const allPCs = await pool.query("SELECT * FROM pc");
    res.json(allPCs.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.put("/pc/:id", async (req, res) => {
  const { id } = req.params;
  const {
    it_code,
    brand,
    serial_number,
    ip_address,
    mac_address,
    host_name,
    location,
    business_unit,
    department,
    username,
    status,
  } = req.body;

  try {
    const updatePC = await pool.query(
      "UPDATE pc SET it_code = $1, brand = $2, serial_number = $3, ip_address = $4, mac_address = $5, host_name = $6, location = $7, business_unit = $8, department = $9, username = $10, status = $11 WHERE id = $12 RETURNING *",
      [
        it_code,
        brand,
        serial_number,
        ip_address,
        mac_address,
        host_name,
        location,
        business_unit,
        department,
        username,
        status,
        id,
      ]
    );

    if (updatePC.rows.length === 0) {
      return res.status(404).send("PC not found");
    }

    res.json(updatePC.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.delete("/pc/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletePC = await pool.query(
      "DELETE FROM pc WHERE id = $1 RETURNING *",
      [id]
    );

    if (deletePC.rows.length === 0) {
      return res.status(404).send("PC not found");
    }

    res.json({ message: "PC deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// CRUD Endpoints for telnet
app.post("/telnet", async (req, res) => {
  const {
    area,
    role,
    ip_address,
    hostname,
    brand,
    device_type,
    serial_number,
    source_date,
  } = req.body;

  try {
    const newTelnet = await pool.query(
      "INSERT INTO telnet (area, role, ip_address, hostname, brand, device_type, serial_number, source_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        area,
        role,
        ip_address,
        hostname,
        brand,
        device_type,
        serial_number,
        source_date,
      ]
    );

    res.json(newTelnet.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Moved outside of app.post
app.get("/telnet", async (req, res) => {
  try {
    const allTelnetEntries = await pool.query("SELECT * FROM telnet");
    res.json(allTelnetEntries.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.put("/telnet/:id", async (req, res) => {
  const { id } = req.params;
  const {
    area,
    role,
    ip_address,
    hostname,
    brand,
    device_type,
    serial_number,
    source_date,
  } = req.body;

  try {
    const updateTelnet = await pool.query(
      "UPDATE telnet SET area = $1, role = $2, ip_address = $3, hostname = $4, brand = $5, device_type = $6, serial_number = $7, source_date = $8 WHERE id = $9 RETURNING *",
      [
        area,
        role,
        ip_address,
        hostname,
        brand,
        device_type,
        serial_number,
        source_date,
        id,
      ]
    );

    if (updateTelnet.rows.length === 0) {
      return res.status(404).send("Telnet entry not found");
    }

    res.json(updateTelnet.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Moved outside of app.put
app.delete("/telnet/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTelnet = await pool.query(
      "DELETE FROM telnet WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleteTelnet.rows.length === 0) {
      return res.status(404).send("Telnet entry not found");
    }

    res.json({ message: "Telnet entry deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Import Excel telnet
app.post("/telnet/import", async (req, res) => {
  console.log("Received data:", JSON.stringify(req.body, null, 2));
  try {
    const data = req.body;
    const ip_address = new Set();
    const duplicates = [];

    for (const item of data) {
      console.log("Processing item:", JSON.stringify(item, null, 2));
      try {
        // Convert dates to DD/MM/YYYY format
        item.source_date = convertExcelDate(item.source_date);

        // Check for duplicates in the current batch
        if (ip_address.has(item.ip_address)) {
          duplicates.push(item);
          continue;
        }

        // Check for duplicates in the database
        const duplicateCheck = await pool.query(
          "SELECT * FROM telnet WHERE ip_address = $1",
          [item.ip_address]
        );

        if (duplicateCheck.rows.length > 0) {
          duplicates.push(item);
          continue;
        }

        // Add to sets to track duplicates in the current batch
        ip_address.add(item.ip_address);

        // Insert into the 'telnet' table
        await pool.query(
          "INSERT INTO telnet (area, role, ip_address, hostname, brand, device_type, serial_number, source_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [
            item.area,
            item.role,
            item.ip_address,
            item.hostname,
            item.brand,
            item.device_type,
            item.serial_number,
            item.source_date,
          ]
        );
      } catch (itemError) {
        console.error(
          "Error processing item:",
          JSON.stringify(item, null, 2),
          itemError
        );
      }
    }

    if (duplicates.length > 0) {
      return res
        .status(400)
        .json({ message: "Duplicate data found", duplicates });
    }

    res.json({ message: "Data imported successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "An error occurred while importing data",
      details: error.message,
      stack: error.stack,
    });
  }
});

// Import Excel server
app.post("/server/import", async (req, res) => {
  console.log("Received data:", JSON.stringify(req.body, null, 2));
  try {
    const data = req.body;
    const ip_address = new Set();
    const duplicates = [];

    for (const item of data) {
      console.log("Processing item:", JSON.stringify(item, null, 2));
      try {
        // Convert dates to DD/MM/YYYY format if necessary
        item.eosl_date = convertExcelDate(item.eosl_date);
        item.planned_refresh_date = convertExcelDate(item.planned_refresh_date);
        item.warranty_start_date = convertExcelDate(item.warranty_start_date);
        item.end_date = convertExcelDate(item.end_date);
        item.date_disposed = convertExcelDate(item.date_disposed);
        item.date_purchased = convertExcelDate(item.date_purchased);

        // Check for duplicates in the current batch
        if (ip_address.has(item.ip_address)) {
          duplicates.push(item);
          continue;
        }

        // Check for duplicates in the database
        const duplicateCheck = await pool.query(
          "SELECT * FROM server WHERE ip_address = $1",
          [item.ip_address]
        );

        if (duplicateCheck.rows.length > 0) {
          duplicates.push(item);
          continue;
        }

        // Add to sets to track duplicates in the current batch
        ip_address.add(item.ip_address);

        // Insert into the 'server' table
        await pool.query(
          `INSERT INTO server (
            rack,
            seq,
            type,
            active,
            asset_category,
            asset_number,
            asset_tag_number,
            site,
            location,
            "user",
            job_title,
            bu,
            domain,
            deposit_cyberark,
            server_ownership,
            application_owner,
            system_owner,
            business_unit,
            add_in_solarwinds,
            server_role,
            brand,
            mac_address,
            host_name,
            ip_address,
            ilo,
            model,
            serial_no,
            physical_virtual,
            power_supply_model,
            eosl_date,
            planned_refresh_date,
            eosl_status,
            cip,
            date_purchased,
            power_supply_model_description,
            power_consumption,
            btu_hour,
            po_renewal_maintenance_contract,
            po_purchase_material,
            cost_local_currency,
            indicate_which_currency,
            cost_usd,
            utilization_storage,
            criticality_rating,
            dr_enable,
            warranty_start_date,
            end_date,
            date_disposed,
            core_each_processor,
            number_of_physical_processor,
            total_core,
            cpu,
            ram,
            hard_disk,
            part_number_harddisk,
            usb_disabled,
            cd_dvd,
            os_version,
            remarks,
            ms_office_version,
            druva,
            ip_guard,
            fde
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
            $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, 
            $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, 
            $57, $58, $59, $60, $61, $62, $63
          ) RETURNING *`,
          [
            item.rack,
            item.seq,
            item.type,
            item.active,
            item.asset_category,
            item.asset_number,
            item.asset_tag_number,
            item.site,
            item.location,
            item.user,
            item.job_title,
            item.bu,
            item.domain,
            item.deposit_cyberark,
            item.server_ownership,
            item.application_owner,
            item.system_owner,
            item.business_unit,
            item.add_in_solarwinds,
            item.server_role,
            item.brand,
            item.mac_address,
            item.host_name,
            item.ip_address,
            item.ilo,
            item.model,
            item.serial_no,
            item.physical_virtual,
            item.power_supply_model,
            item.eosl_date,
            item.planned_refresh_date,
            item.eosl_status,
            item.cip,
            item.date_purchased,
            item.power_supply_model_description,
            item.power_consumption,
            item.btu_hour,
            item.po_renewal_maintenance_contract,
            item.po_purchase_material,
            item.cost_local_currency,
            item.indicate_which_currency,
            item.cost_usd,
            item.utilization_storage,
            item.criticality_rating,
            item.dr_enable,
            item.warranty_start_date,
            item.end_date,
            item.date_disposed,
            item.core_each_processor,
            item.number_of_physical_processor,
            item.total_core,
            item.cpu,
            item.ram,
            item.hard_disk,
            item.part_number_harddisk,
            item.usb_disabled,
            item.cd_dvd,
            item.os_version,
            item.remarks,
            item.ms_office_version,
            item.druva,
            item.ip_guard,
            item.fde,
          ]
        );
      } catch (itemError) {
        console.error(
          "Error processing item:",
          JSON.stringify(item, null, 2),
          itemError
        );
      }
    }

    if (duplicates.length > 0) {
      return res.status(400).json({
        message:
          "Duplicate data found during import. Please check the following entries:",
        duplicates,
      });
    }

    res.json({ message: "Data imported successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "An error occurred while importing data",
      details: error.message,
      stack: error.stack,
    });
  }
});
// CRUD Endpoints for Microsoft
app.post("/microsoft", async (req, res) => {
  const {
    company_name,
    department,
    user_name,
    account,
    products_name,
    sku_number,
    version,
    type_license,
    contact_number,
    qty,
    effective_date,
    expired_date,
    po,
    vendor_name,
    email_vendor,
  } = req.body;
  try {
    const newMicrosoft = await pool.query(
      "INSERT INTO microsoft (company_name, department, user_name, account, products_name, sku_number, version, type_license, contact_number, qty, effective_date, expired_date, po, vendor_name, email_vendor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10, $11, $12, $13, $14, $15) RETURNING *",
      [
        company_name,
        department,
        user_name,
        account,
        products_name,
        sku_number,
        version,
        type_license,
        contact_number,
        qty,
        effective_date,
        expired_date,
        po,
        vendor_name,
        email_vendor,
      ]
    );

    res.json(newMicrosoft.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.get("/microsoft", async (req, res) => {
  try {
    const allMicrosoft = await pool.query("SELECT * FROM microsoft");
    res.json(allMicrosoft.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.put("/microsoft/:id", async (req, res) => {
  const { id } = req.params;
  const {
    company_name,
    department,
    user_name,
    account,
    products_name,
    sku_number,
    version,
    type_license,
    contact_number,
    qty,
    effective_date,
    expired_date,
    po,
    vendor_name,
    email_vendor,
  } = req.body;

  try {
    const updateMicrosoft = await pool.query(
      "UPDATE microsoft SET company_name = $1, department = $2, user_name = $3, account = $4, products_name = $5, sku_number = $6, version = $7, type_license = $8, contact_number = $9, qty = $10, effective_date = $11, expired_date = $12, po = $13, vendor_name = $14, email_vendor = $15 WHERE id = $16 RETURNING *",
      [
        company_name,
        department,
        user_name,
        account,
        products_name,
        sku_number,
        version,
        type_license,
        contact_number,
        qty,
        effective_date,
        expired_date,
        po,
        vendor_name,
        email_vendor,
        id,
      ]
    );

    if (updateMicrosoft.rows.length === 0) {
      return res.status(404).send("License not found");
    }

    res.json(updateMicrosoft.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.delete("/microsoft/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteMicrosoft = await pool.query(
      "DELETE FROM microsoft WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleteMicrosoft.rows.length === 0) {
      return res.status(404).send("License not found");
    }

    res.json({ message: "License deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

function convertExcelDate(excelDate) {
  const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

app.post("/microsoft/import", async (req, res) => {
  console.log("Received data:", JSON.stringify(req.body, null, 2));
  try {
    const data = req.body;
    for (const item of data) {
      console.log("Processing item:", JSON.stringify(item, null, 2));
      try {
        item.effective_date = convertExcelDate(item.effective_date);
        item.expired_date = convertExcelDate(item.expired_date);
        await pool.query(
          "INSERT INTO microsoft (company_name, department, user_name, account, products_name, sku_number, version, type_license, contact_number, qty, effective_date, expired_date, po, vendor_name, email_vendor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
          [
            item.company_name,
            item.department,
            item.user_name,
            item.account,
            item.products_name,
            item.sku_number,
            item.version,
            item.type_license,
            item.contact_number,
            item.qty,
            item.effective_date,
            item.expired_date,
            item.po,
            item.vendor_name,
            item.email_vendor,
          ]
        );
      } catch (itemError) {
        console.error(
          "Error processing item:",
          JSON.stringify(item, null, 2),
          itemError
        );
        // Continue to next item instead of throwing
      }
    }
    res.json({ message: "Data imported successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "An error occurred while importing data",
      details: error.message,
      stack: error.stack,
    });
  }
});

app.post("/pc/import", async (req, res) => {
  console.log("Received data:", JSON.stringify(req.body, null, 2));
  try {
    const data = req.body;
    const ipAddresses = new Set();
    const macAddresses = new Set();
    const duplicates = [];

    for (const item of data) {
      console.log("Processing item:", JSON.stringify(item, null, 2));
      try {
        item.status = item.status.toUpperCase(); // Convert status to uppercase

        // Check for duplicates in the current batch
        if (
          ipAddresses.has(item.ip_address) ||
          macAddresses.has(item.mac_address)
        ) {
          duplicates.push(item);
          continue;
        }

        // Check for duplicates in the database
        const duplicateCheck = await pool.query(
          "SELECT * FROM pc WHERE ip_address = $1 OR mac_address = $2",
          [item.ip_address, item.mac_address]
        );

        if (duplicateCheck.rows.length > 0) {
          duplicates.push(item);
          continue;
        }

        // Add to sets to track duplicates in the current batch
        ipAddresses.add(item.ip_address);
        macAddresses.add(item.mac_address);

        await pool.query(
          "INSERT INTO pc (it_code, brand, serial_number, ip_address, mac_address, host_name, location, business_unit, department, username, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
          [
            item.it_code,
            item.brand,
            item.serial_number,
            item.ip_address,
            item.mac_address,
            item.host_name,
            item.location,
            item.business_unit,
            item.department,
            item.username,
            item.status,
          ]
        );
      } catch (itemError) {
        console.error(
          "Error processing item:",
          JSON.stringify(item, null, 2),
          itemError
        );
      }
    }

    if (duplicates.length > 0) {
      return res
        .status(400)
        .json({ message: "Duplicate data found", duplicates });
    }

    res.json({ message: "Data imported successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "An error occurred while importing data",
      details: error.message,
      stack: error.stack,
    });
  }
});

// Endpoint to get folder contents
app.post("/folder-contents", (req, res) => {
  const { folderPath } = req.body;

  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading folder: ${err.message}`);
      return res.status(500).json({ error: "Gagal membaca isi folder." });
    }

    const folders = files
      .filter((file) => file.isDirectory())
      .map((file) => file.name);
    const regularFiles = files
      .filter((file) => file.isFile())
      .map((file) => file.name);

    res.json({ folders, files: regularFiles });
  });
});

app.post("/open-file", (req, res) => {
  const { filePath } = req.body;

  // Logika untuk membuka file
  console.log(`Membuka file: ${filePath}`);

  // Perintah untuk membuka file sesuai OS
  let command;
  switch (process.platform) {
    case "win32":
      command = `start "" "${filePath}"`; // Windows
      break;
    case "darwin":
      command = `open "${filePath}"`; // macOS
      break;
    case "linux":
      command = `xdg-open "${filePath}"`; // Linux
      break;
    default:
      return res.status(400).json({ error: "Platform tidak didukung." });
  }

  exec(command, (error) => {
    if (error) {
      console.error(`Error membuka file: ${error.message}`);
      return res.status(500).json({ error: "Gagal membuka file." });
    }
    res.json({ message: `File ${filePath} berhasil dibuka!` });
  });
});

// New endpoint to get folder info
app.post("/folder-info", (req, res) => {
  const { folderPath } = req.body;

  if (!folderPath) {
    return res.status(400).json({ error: "Folder path is required." });
  }

  try {
    const parsedPath = path.parse(folderPath);
    const info = {
      root: parsedPath.root,
      dir: parsedPath.dir,
      base: parsedPath.base,
      ext: parsedPath.ext,
      name: parsedPath.name,
      isAbsolute: path.isAbsolute(folderPath),
      normalized: path.normalize(folderPath),
    };

    res.json(info);
  } catch (error) {
    console.error("Error getting folder info:", error);
    res.status(500).json({ error: "Failed to get folder information." });
  }
});

app.post("/server", async (req, res) => {
  console.log("Received data:", req.body);
  const {
    rack,
    seq,
    type,
    active,
    asset_category,
    asset_number,
    asset_tag_number,
    site,
    location,
    user, // atau "user_name" jika lebih spesifik
    job_title,
    bu,
    domain,
    deposit_cyberark,
    server_ownership,
    application_owner,
    system_owner,
    business_unit,
    add_in_solarwinds,
    server_role,
    brand,
    mac_address,
    host_name,
    ip_address,
    ilo,
    model,
    serial_no,
    physical_virtual,
    power_supply_model,
    eosl_date,
    planned_refresh_date,
    eosl_status,
    cip,
    date_purchased,
    power_supply_model_description,
    power_consumption,
    btu_hour,
    po_renewal_maintenance_contract,
    po_purchase_material,
    cost_local_currency,
    indicate_which_currency,
    cost_usd,
    utilization_storage,
    criticality_rating,
    dr_enable,
    warranty_start_date,
    end_date,
    date_disposed,
    core_each_processor,
    number_of_physical_processor,
    total_core,
    cpu,
    ram,
    hard_disk,
    part_number_harddisk,
    usb_disabled,
    cd_dvd,
    os_version,
    remarks,
    ms_office_version,
    druva,
    ip_guard,
    fde,
  } = req.body;

  console.log("Received data:", req.body); // Logging received data

  try {
    const newServer = await pool.query(
      `INSERT INTO server (
    rack,
    seq,
    type,
    active,
    asset_category,
    asset_number,
    asset_tag_number,
    site,
    location,
    "user",
    job_title,
    bu,
    domain,
    deposit_cyberark,
    server_ownership,
    application_owner,
    system_owner,
    business_unit,
    add_in_solarwinds,
    server_role,
    brand,
    mac_address,
    host_name,
    ip_address,
    ilo,
    model,
    serial_no,
    physical_virtual,
    power_supply_model,
    eosl_date,
    planned_refresh_date,
    eosl_status,
    cip,
    date_purchased,
    power_supply_model_description,
    power_consumption,
    btu_hour,
    po_renewal_maintenance_contract,
    po_purchase_material,
    cost_local_currency,
    indicate_which_currency,
    cost_usd,
    utilization_storage,
    criticality_rating,
    dr_enable,
    warranty_start_date,
    end_date,
    date_disposed,
    core_each_processor,
    number_of_physical_processor,
    total_core,
    cpu,
    ram,
    hard_disk,
    part_number_harddisk,
    usb_disabled,
    cd_dvd,
    os_version,
    remarks,
    ms_office_version,
    druva,
    ip_guard,
    fde
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
    $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, 
    $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, 
    $57, $58, $59, $60, $61, $62, $63
  ) RETURNING *`,
      [
        rack,
        seq,
        type,
        active,
        asset_category,
        asset_number,
        asset_tag_number,
        site,
        location,
        user, // gunakan tanda kutip ganda "user" karena 'user' adalah kata kunci PostgreSQL
        job_title,
        bu,
        domain,
        deposit_cyberark,
        server_ownership,
        application_owner,
        system_owner,
        business_unit,
        add_in_solarwinds,
        server_role,
        brand,
        mac_address,
        host_name,
        ip_address,
        ilo,
        model,
        serial_no,
        physical_virtual,
        power_supply_model,
        eosl_date,
        planned_refresh_date,
        eosl_status,
        cip,
        date_purchased,
        power_supply_model_description,
        power_consumption,
        btu_hour,
        po_renewal_maintenance_contract,
        po_purchase_material,
        cost_local_currency,
        indicate_which_currency,
        cost_usd,
        utilization_storage,
        criticality_rating,
        dr_enable,
        warranty_start_date,
        end_date,
        date_disposed,
        core_each_processor,
        number_of_physical_processor,
        total_core,
        cpu,
        ram,
        hard_disk,
        part_number_harddisk,
        usb_disabled,
        cd_dvd,
        os_version,
        remarks,
        ms_office_version,
        druva,
        ip_guard,
        fde,
      ]
    );

    res.json(newServer.rows[0]);
  } catch (err) {
    console.error("Error inserting data:", err.message); // Logging error message
    res.status(500).json({ message: "Server error", error: err.message }); // Improved error response
  }
});

//crud server
app.get("/server", async (req, res) => {
  try {
    const allServer = await pool.query("SELECT * FROM server");
    res.json(allServer.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.put("/server/:id", async (req, res) => {
  const { id } = req.params;
  const {
    rack,
    seq,
    type,
    active,
    asset_category,
    asset_number,
    asset_tag_number,
    site,
    location,
    user, // atau "user_name" jika lebih spesifik
    job_title,
    bu,
    domain,
    deposit_cyberark,
    server_ownership,
    application_owner,
    system_owner,
    business_unit,
    add_in_solarwinds,
    server_role,
    brand,
    mac_address,
    host_name,
    ip_address,
    ilo,
    model,
    serial_no,
    physical_virtual,
    power_supply_model,
    eosl_date,
    planned_refresh_date,
    eosl_status,
    cip,
    date_purchased,
    power_supply_model_description,
    power_consumption,
    btu_hour,
    po_renewal_maintenance_contract,
    po_purchase_material,
    cost_local_currency,
    indicate_which_currency,
    cost_usd,
    utilization_storage,
    criticality_rating,
    dr_enable,
    warranty_start_date,
    end_date,
    date_disposed,
    core_each_processor,
    number_of_physical_processor,
    total_core,
    cpu,
    ram,
    hard_disk,
    part_number_harddisk,
    usb_disabled,
    cd_dvd,
    os_version,
    remarks,
    ms_office_version,
    druva,
    ip_guard,
    fde,
  } = req.body;

  try {
    const updateServer = await pool.query(
      `UPDATE server 
   SET 
     rack = $1, 
     seq = $2, 
     type = $3, 
     active = $4, 
     asset_category = $5, 
     asset_number = $6, 
     asset_tag_number = $7, 
     site = $8, 
     location = $9, 
     "user" = $10,
     job_title = $11, 
     bu = $12, 
     domain = $13, 
     deposit_cyberark = $14, 
     server_ownership = $15, 
     application_owner = $16, 
     system_owner = $17, 
     business_unit = $18, 
     add_in_solarwinds = $19, 
     server_role = $20, 
     brand = $21, 
     mac_address = $22, 
     host_name = $23, 
     ip_address = $24, 
     ilo = $25, 
     model = $26, 
     serial_no = $27, 
     physical_virtual = $28, 
     power_supply_model = $29, 
     eosl_date = $30, 
     planned_refresh_date = $31, 
     eosl_status = $32, 
     cip = $33, 
     date_purchased = $34, 
     power_supply_model_description = $35, 
     power_consumption = $36, 
     btu_hour = $37, 
     po_renewal_maintenance_contract = $38, 
     po_purchase_material = $39, 
     cost_local_currency = $40, 
     indicate_which_currency = $41, 
     cost_usd = $42, 
     utilization_storage = $43, 
     criticality_rating = $44, 
     dr_enable = $45, 
     warranty_start_date = $46, 
     end_date = $47, 
     date_disposed = $48, 
     core_each_processor = $49, 
     number_of_physical_processor = $50, 
     total_core = $51, 
     cpu = $52, 
     ram = $53, 
     hard_disk = $54, 
     part_number_harddisk = $55, 
     usb_disabled = $56, 
     cd_dvd = $57, 
     os_version = $58, 
     remarks = $59, 
     ms_office_version = $60, 
     druva = $61, 
     ip_guard = $62, 
     fde = $63 
   WHERE id = $64 RETURNING *`,
      [
        rack,
        seq,
        type,
        active,
        asset_category,
        asset_number,
        asset_tag_number,
        site,
        location,
        user, // gunakan tanda kutip ganda "user" karena 'user' adalah kata kunci PostgreSQL
        job_title,
        bu,
        domain,
        deposit_cyberark,
        server_ownership,
        application_owner,
        system_owner,
        business_unit,
        add_in_solarwinds,
        server_role,
        brand,
        mac_address,
        host_name,
        ip_address,
        ilo,
        model,
        serial_no,
        physical_virtual,
        power_supply_model,
        eosl_date,
        planned_refresh_date,
        eosl_status,
        cip,
        date_purchased,
        power_supply_model_description,
        power_consumption,
        btu_hour,
        po_renewal_maintenance_contract,
        po_purchase_material,
        cost_local_currency,
        indicate_which_currency,
        cost_usd,
        utilization_storage,
        criticality_rating,
        dr_enable,
        warranty_start_date,
        end_date,
        date_disposed,
        core_each_processor,
        number_of_physical_processor,
        total_core,
        cpu,
        ram,
        hard_disk,
        part_number_harddisk,
        usb_disabled,
        cd_dvd,
        os_version,
        remarks,
        ms_office_version,
        druva,
        ip_guard,
        fde,
        id, // ID dari server yang ingin diupdate
      ]
    );

    if (updateServer.rows.length === 0) {
      return res.status(404).send("Server repair not found");
    }

    res.json(updateServer.rows[0]);
  } catch (err) {
    console.error("Error updating data:", err.message); // Tambahkan logging untuk kesalahan
    res.status(500).send("Server error");
  }
});

app.delete("/server/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteServer = await pool.query(
      "DELETE FROM server WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleteServer.rows.length === 0) {
      return res.status(404).send("not found");
    }

    res.json({ message: "deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//crud vendor repair

app.post("/vendor-repair", async (req, res) => {
  const {
    repair_date,
    ticket_number,
    engineer_name,
    username,
    bu_name,
    material_name,
    brand,
    type,
    serial_number,
    cost_center,
    pr_number,
    po_number,
    quotation_date,
    cost_without,
    status,
    vendor_delivery_date,
    remarks,
  } = req.body;

  // Validasi input
  if (!ticket_number || !repair_date) {
    return res
      .status(400)
      .json({ message: "Ticket number and repair date are required." });
  }

  try {
    const newVendorRepair = await pool.query(
      "INSERT INTO vendor_repair (repair_date, ticket_number, engineer_name, username, bu_name, material_name, brand, type, serial_number, cost_center, pr_number, po_number, quotation_date, cost_without, status, vendor_delivery_date, remarks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *",
      [
        repair_date,
        ticket_number,
        engineer_name,
        username,
        bu_name,
        material_name,
        brand,
        type,
        serial_number,
        cost_center,
        pr_number,
        po_number,
        quotation_date,
        cost_without,
        status,
        vendor_delivery_date,
        remarks,
      ]
    );

    res.status(201).json(newVendorRepair.rows[0]);
  } catch (err) {
    console.error("Error saving vendor repair data:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/vendor-repair", async (req, res) => {
  try {
    const allVendorRepair = await pool.query("SELECT * FROM vendor_repair");
    res.json(allVendorRepair.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.put("/vendor-repair/:id", async (req, res) => {
  const { id } = req.params;
  const {
    repair_date,
    ticket_number,
    engineer_name,
    username,
    bu_name,
    material_name,
    brand,
    type,
    serial_number,
    cost_center,
    pr_number,
    po_number,
    quotation_date,
    cost_without,
    status,
    vendor_delivery_date,
    remarks,
  } = req.body;

  try {
    const updateVendorRepair = await pool.query(
      "UPDATE vendor_repair SET repair_date = $1, ticket_number = $2, engineer_name = $3, username = $4, bu_name = $5, material_name = $6, brand = $7, type = $8, serial_number = $9, cost_center = $10, pr_number = $11, po_number = $12, quotation_date = $13, cost_without = $14, status = $15, vendor_delivery_date = $16, remarks = $17 WHERE id = $18 RETURNING *",
      [
        repair_date,
        ticket_number,
        engineer_name,
        username,
        bu_name,
        material_name,
        brand,
        type,
        serial_number,
        cost_center,
        pr_number,
        po_number,
        quotation_date,
        cost_without,
        status,
        vendor_delivery_date,
        remarks,
        id,
      ]
    );

    if (updateVendorRepair.rows.length === 0) {
      return res.status(404).send("Vendor repair not found");
    }

    res.json(updateVendorRepair.rows[0]);
  } catch (err) {
    console.error("Error updating data:", err.message); 
    res.status(500).send("Server error");
  }
});

app.delete("/vendor-repair/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteVendorRepair = await pool.query(
      "DELETE FROM vendor_repair WHERE id = $1 RETURNING *",
      [id]
    );

    if (deleteVendorRepair.rows.length === 0) {
      return res.status(404).send("not found");
    }

    res.json({ message: "deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/vendor-repair/import", async (req, res) => {
  console.log("Received data:", JSON.stringify(req.body, null, 2));
  try {
    const data = req.body;
    const ticketNumbers = new Set();
    const duplicates = [];

    for (const item of data) {
      console.log("Processing item:", JSON.stringify(item, null, 2));
      try {
        // Convert dates to DD/MM/YYYY format
        item.repair_date = convertExcelDate(item.repair_date);
        item.quotation_date = convertExcelDate(item.quotation_date);
        item.date = convertExcelDate(item.date);

        // Check for duplicates in the current batch
        if (ticketNumbers.has(item.ticket_number)) {
          duplicates.push(item);
          continue;
        }

        // Check for duplicates in the database
        const duplicateCheck = await pool.query(
          "SELECT * FROM vendor_repair WHERE ticket_number = $1",
          [item.ticket_number]
        );

        if (duplicateCheck.rows.length > 0) {
          duplicates.push(item);
          continue;
        }

        // Add to sets to track duplicates in the current batch
        ticketNumbers.add(item.ticket_number);

        await pool.query(
          "INSERT INTO vendor_repair (repair_date, ticket_number, engineer_name, username, bu_name, material_name, brand, type, serial_number, cost_center, pr_number, po_number, quotation_date, cost_without, status, vendor_delivery_date, remarks) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
          [
            item.repair_date,
            item.ticket_number,
            item.engineer_name,
            item.username,
            item.bu_name,
            item.material_name,
            item.brand,
            item.type,
            item.serial_number,
            item.cost_center,
            item.pr_number,
            item.po_number,
            item.quotation_date,
            item.cost_without,
            item.status,
            new Date(item.vendor_delivery_date).toISOString(), // Convert to ISO date format if necessary

            item.remarks,
          ]
        );
      } catch (itemError) {
        console.error(
          "Error processing item:",
          JSON.stringify(item, null, 2),
          itemError
        );
      }
    }

    if (duplicates.length > 0) {
      return res
        .status(400)
        .json({ message: "Duplicate data found", duplicates });
    }

    res.json({ message: "Data imported successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "An error importing data",
      details: error.message,
      stack: error.stack,
    });
  }
});

// Endpoint to save folder path
app.post("/save-folder-path", async (req, res) => {
  const { folderPath, title } = req.body;

  if (!folderPath || !title) {
    return res
      .status(400)
      .json({ message: "Folder path and title are required." });
  }

  try {
    // Check if the folder path already exists
    const existingPath = await pool.query(
      "SELECT * FROM folder_paths WHERE folder_path = $1",
      [folderPath]
    );

    if (existingPath.rows.length > 0) {
      return res.status(400).json({ message: "This path is already saved." });
    }

    const result = await pool.query(
      "INSERT INTO folder_paths (folder_path, title, created_at) VALUES ($1, $2, NOW()) RETURNING *",
      [folderPath, title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error saving folder path:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// Endpoint to get all saved folder paths
app.get("/folder-paths", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM folder_paths ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching folder paths:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// Endpoint to delete a saved folder path
app.delete("/folder-paths/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM folder_paths WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Folder path not found." });
    }
    res.json({ message: "Folder path deleted successfully." });
  } catch (err) {
    console.error("Error deleting folder path:", err);
    res.status(500).json({ message: "Server error." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
