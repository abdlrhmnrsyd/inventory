const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const { exec } = require('child_process'); 


const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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
    res.status(500).json({ message: "Server error." });
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
  return date.toISOString().split('T')[0];
}

app.post('/microsoft/import', async (req, res) => {
  console.log('Received data:', JSON.stringify(req.body, null, 2));
  try {
    const data = req.body;
    for (const item of data) {
      console.log('Processing item:', JSON.stringify(item, null, 2));
      try {
        item.effective_date = convertExcelDate(item.effective_date);
        item.expired_date = convertExcelDate(item.expired_date);
        await pool.query(
          'INSERT INTO microsoft (company_name, department, user_name, account, products_name, sku_number, version, type_license, contact_number, qty, effective_date, expired_date, po, vendor_name, email_vendor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
          [item.company_name, item.department, item.user_name, item.account, item.products_name, item.sku_number, item.version, item.type_license, item.contact_number, item.qty, item.effective_date, item.expired_date, item.po, item.vendor_name, item.email_vendor,]
        );
      } catch (itemError) {
        console.error('Error processing item:', JSON.stringify(item, null, 2), itemError);
        // Continue to next item instead of throwing
      }
    }
    res.json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'An error occurred while importing data', details: error.message, stack: error.stack });
  }
});

app.post('/pc/import', async (req, res) => {
  console.log('Received data:', JSON.stringify(req.body, null, 2));
  try {
    const data = req.body;
    for (const item of data) {
      console.log('Processing item:', JSON.stringify(item, null, 2));
      try {
        item.status = item.status.toUpperCase(); // Convert status to uppercase
        await pool.query(
          'INSERT INTO pc (it_code, brand, serial_number, ip_address, mac_address, host_name, location, business_unit, department, username, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
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
            item.status
          ]
        );
      } catch (itemError) {
        console.error('Error processing item:', JSON.stringify(item, null, 2), itemError);

      }
    }
    res.json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'An error occurred while importing data', details: error.message, stack: error.stack });
  }
});

app.post('/open-folder', (req, res) => {
  const { folderPath } = req.body;

  // Logika untuk membuka folder
  console.log(`Membuka folder: ${folderPath}`);

  // Perintah untuk membuka file manager sesuai OS
  let command;
  switch (process.platform) {
    case 'win32':
      command = `start "" "${folderPath}"`; // Windows
      break;
    case 'darwin':
      command = `open "${folderPath}"`; // macOS
      break;
    case 'linux':
      command = `xdg-open "${folderPath}"`; // Linux
      break;
    default:
      return res.status(400).json({ error: 'Platform tidak didukung.' });
  }

  exec(command, (error) => {
    if (error) {
      console.error(`Error membuka folder: ${error.message}`);
      return res.status(500).json({ error: 'Gagal membuka folder.' });
    }
    res.json({ message: `Folder ${folderPath} berhasil dibuka!` });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});