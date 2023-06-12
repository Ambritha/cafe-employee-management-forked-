const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Create and connect to the SQLite database
const db = new sqlite3.Database("cafeemployee.db");

// Create the tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cafes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      logo TEXT,
      location TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email_address TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      gender TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS employee_cafe (
      employee_id TEXT,
      cafe_id INTEGER,
      start_date TEXT NOT NULL,
      FOREIGN KEY (employee_id) REFERENCES employees(id),
      FOREIGN KEY (cafe_id) REFERENCES cafes(id)
    )
  `);
});
const checkEmployeeData = `SELECT COUNT(*) as count FROM employees`;
const checkCafeData = `SELECT COUNT(*) as count FROM cafes`;
const checkEmployeeCafeData = `SELECT COUNT(*) as count FROM employee_cafe`;

db.get(checkEmployeeData, (err, row) => {
  if (err) {
    console.error("Error checking employee data:", err);
    return;
  }

  if (row.count === 0) {
    // Insert employee seed data
    const employeeInsert = `INSERT INTO employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)`;
    const employees = [
      ["UI000001", "John Doe", "john@hotmail.com", "78756451", "Male"],
      ["UI000002", "Kate Smith", "kate@gmail.com", "78754677", "Male"],
      ["UI000003", "Peter Hein", "peter@gmail.com", "346346634", "Male"],
      ["UI000004", "Gopi D", "gopid@abc.com", "34636346", "Male"],
      ["UI000005", "Brad R", "bradr@yopmail.com", "43346346", "Male"],
    ];

    db.serialize(() => {
      db.run("BEGIN TRANSACTION");
      employees.forEach((employee) => {
        db.run(employeeInsert, employee);
      });
      db.run("COMMIT", () => {});
    });
  }
});

db.get(checkCafeData, (err, row) => {
  if (err) {
    console.error("Error checking cafe data:", err);
    return;
  }

  if (row.count === 0) {
    // Insert cafe seed data
    const cafeInsert = `INSERT INTO cafes (id, name, description, logo, location) VALUES (?, ?, ?, ?, ?)`;
    const cafes = [
      [
        "CAFE001",
        "Cafe A",
        "Sample description for Cafe A",
        "cafe_a_logo.png",
        "Singapore",
      ],
      [
        "CAFE001",
        "Cafe B",
        "Sample description for Cafe B",
        "cafe_b_logo.png",
        "Clementi",
      ],
      [
        "CAFE001",
        "Cafe C",
        "Sample description for Cafe c",
        "cafe_c_logo.png",
        "Little India",
      ],
      [
        "CAFE001",
        "Cafe D",
        "Sample description for Cafe d",
        "cafe_d_logo.png",
        "ChinaTown",
      ],
      [
        "CAFE001",
        "Cafe E",
        "Sample description for Cafe e",
        "cafe_e_logo.png",
        "Ferar park",
      ],
      // Add more cafe data
    ];

    db.serialize(() => {
      db.run("BEGIN TRANSACTION");
      cafes.forEach((cafe) => {
        db.run(cafeInsert, cafe);
      });
      db.run("COMMIT", () => {});
    });
  }
});
db.get(checkEmployeeCafeData, (err, row) => {
  if (err) {
    console.error("Error checking employee data:", err);
    return;
  }

  if (row.count === 0) {
    // Insert employee seed data
    const employeeInsert = `INSERT INTO employee_cafe (employee_id, cafe_id, start_date) VALUES (?, ?, ? )`;
    const employees = [
      ["UI000001", "1", "01-07-2023"],
      ["UI000002", "3", "02-01-2023"],
      ["UI000003", "2", "03-04-2022"],
      ["UI000004", "5", "08-07-2022"],
      ["UI000005", "4", "09-05-2023"],
    ];

    db.serialize(() => {
      db.run("BEGIN TRANSACTION");
      employees.forEach((employee) => {
        db.run(employeeInsert, employee);
      });
      db.run("COMMIT", () => {});
    });
  }
});
// Define the routes
app.get("/cafes", (req, res) => {
  const location = req.query.location;

  let query =
    "SELECT cafes.name, cafes.description, COUNT(employee_cafe.employee_id) as employees, cafes.logo, cafes.location, cafes.id FROM cafes LEFT JOIN employee_cafe ON cafes.id = employee_cafe.cafe_id ";

  if (location) {
    query += `WHERE cafes.location = '${location}' `;
  }

  query += "GROUP BY cafes.id ORDER BY employees DESC";

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
});

app.get("/employees", (req, res) => {
  const cafe = req.query.cafe;

  let query =
    "SELECT employees.id, employees.name, employees.email_address, employees.phone_number, " +
    'strftime("%d", date("now")) - strftime("%d", employee_cafe.start_date) as days_worked, ' +
    "cafes.name AS cafe FROM employees LEFT JOIN employee_cafe ON employees.id = employee_cafe.employee_id " +
    "LEFT JOIN cafes ON cafes.id = employee_cafe.cafe_id ";

  if (cafe) {
    query += `WHERE cafes.name = '${cafe}' `;
  }

  query += "ORDER BY days_worked DESC";

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
});

app.post("/cafe", (req, res) => {
  const { name, description, logo, location } = req.body;

  db.run(
    "INSERT INTO cafes (name, description, logo, location) VALUES (?, ?, ?, ?)",
    [name, description, logo, location],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

app.post("/employee", (req, res) => {
  const { id, name, email_address, phone_number, gender, cafe } = req.body;

  db.serialize(() => {
    db.run(
      "INSERT INTO employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)",
      [id, name, email_address, phone_number, gender],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        if (cafe) {
          db.run(
            'INSERT INTO employee_cafe (employee_id, cafe_id, start_date) VALUES (?, ?, date("now"))',
            [id, cafe],
            function (err) {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                res.json({ id });
              }
            }
          );
        } else {
          res.json({ id });
        }
      }
    );
  });
});

app.put("/cafe/:id", (req, res) => {
  const id = req.params.id;
  const { name, description, logo, location } = req.body;

  db.run(
    "UPDATE cafes SET name = ?, description = ?, logo = ?, location = ? WHERE id = ?",
    [name, description, logo, location, id],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ id });
      }
    }
  );
});

app.put("/employee/:id", (req, res) => {
  const id = req.params.id;
  const { name, email_address, phone_number, gender, cafe } = req.body;

  db.serialize(() => {
    db.run(
      "UPDATE employees SET name = ?, email_address = ?, phone_number = ?, gender = ? WHERE id = ?",
      [name, email_address, phone_number, gender, id],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        if (cafe) {
          db.run(
            "UPDATE employee_cafe SET cafe_id = ? WHERE employee_id = ?",
            [cafe, id],
            function (err) {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                res.json({ id });
              }
            }
          );
        } else {
          res.json({ id });
        }
      }
    );
  });
});

app.delete("/cafe/:id", (req, res) => {
  const id = req.params.id;

  db.serialize(() => {
    db.run("DELETE FROM employee_cafe WHERE cafe_id = ?", [id], function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      db.run("DELETE FROM cafes WHERE id = ?", [id], function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.json({ id });
        }
      });
    });
  });
});

app.delete("/employee/:id", (req, res) => {
  const id = req.params.id;

  db.serialize(() => {
    db.run(
      "DELETE FROM employee_cafe WHERE employee_id =?",
      [id],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        db.run("DELETE FROM cafes WHERE id = ?", [id], function (err) {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            res.json({ id });
          }
        });
      }
    );
  });
});

app.listen(3001, () => {
  console.log("Server started (https://hjcv7r-3001.csb.app/) !");
});
