const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",// add password here 
  database: "bank",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("MySQL Connected...");
});

router.get("/", (req, res) => {
  let sql = "SELECT * FROM customers";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching customers:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("index", { options: results });
  });
});

router.get("/customers", (req, res) => {
  let sql = "SELECT * FROM customers";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching customers:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("customers", { customers: results });
  });
});

router.get("/customerDetail", (req, res) => {
  let sql = "SELECT * FROM customers";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching customers:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.render("customerDetails", { options: results });
  });
});

router.get("/details/:id", (req, res) => {
  const customerId = req.params.id;
  let sql = "SELECT * FROM customers WHERE id = ?";
  db.query(sql, [customerId], (err, results) => {
    if (err) {
      console.error("Error fetching customer details:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }
    const customer = results[0];
    res.json({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      balance: customer.balance,
    });
  });
});

router.post("/transfer", (req, res) => {
  const { senderId, receiverId, amount } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    let sql = "UPDATE customers SET balance = balance - ? WHERE id = ?";
    db.query(sql, [amount, senderId], (err, result) => {
      if (err) {
        console.error("Error updating sender balance:", err);
        return db.rollback(() => {
          res.status(500).send("Internal Server Error");
        });
      }

      console.log(
        `Updated sender's balance: ${result.affectedRows} row(s) affected`
      );
      sql = "UPDATE customers SET balance = balance + ? WHERE id = ?";
      db.query(sql, [amount, receiverId], (err, result) => {
        if (err) {
          console.error("Error updating receiver balance:", err);
          return db.rollback(() => {
            res.status(500).send("Internal Server Error");
          });
        }

        console.log(
          `Updated receiver's balance: ${result.affectedRows} row(s) affected`
        );

        sql =
          "INSERT INTO transfers (sender_id, receiver_id, amount) VALUES (?, ?, ?)";
        db.query(sql, [senderId, receiverId, amount], (err, result) => {
          if (err) {
            console.error("Error recording transfer:", err);
            return db.rollback(() => {
              res.status(500).send("Internal Server Error");
            });
          }

          console.log(`Recorded transfer: ${result.insertId}`);

          db.commit((err) => {
            if (err) {
              console.error("Error committing transaction:", err);
              return db.rollback(() => {
                res.status(500).send("Internal Server Error");
              });
            }

            console.log("Transaction successful");
            res.status(200).json({ message: "Transaction successful" });
          });
        });
      });
    });
  });
});

router.get("/transfer-success", (req, res) => {
  const { senderId, receiverId, amount } = req.query;

  let sql1 = "SELECT * FROM customers WHERE id = ?";
  let sql2 = "SELECT * FROM customers WHERE id = ?";

  db.query(sql1, [senderId], (err, results1) => {
    if (err) {
      console.error("Error fetching sender details:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const sender = results1[0];

    db.query(sql2, [receiverId], (err, results2) => {
      if (err) {
        console.error("Error fetching receiver details:", err);
        res.status(500).send("Internal Server Error");
        return;
      }
      const receiver = results2[0];

      res.render("transfer-success", { sender, receiver, amount });
    });
  });
});

module.exports = router;
