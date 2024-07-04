# Bank Transaction System

This project is a simple bank transaction system built using Node.js, Express, and MySQL for database operations. It allows users to view customer details, transfer money between customers, and view transaction success details.

## Features

- **View All Customers**: See a list of all customers registered in the bank.
- **View Customer Details**: Select a customer to view detailed information including name, email, user ID, and balance.
- **Transfer Money**: Transfer money between two selected customers and view updated balances after the transaction.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sujal-Gupta-SG/Bank-Transaction-System.git
   cd Bank-Transaction-System
   ```
2.**Install dependencies:**
```
npm install
```


Modify `DB_PASSWORD` and other values according to your MySQL setup.

## Database Setup

1. Ensure you have MySQL installed and running.
2. Create a database named `bank` and set up the `customers` and `transfers` tables as per the schema used in the project.

## Getting Started

1. Start the application:
   ```bash
   npm start
   ```
2. **Install dependencies:**
```
npm install
 ```
3.**Create a `.env` file in the root directory with the following variables (modify values accordingly):**
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YourPassword
DB_DATABASE=bank
```

4. **Ensure MySQL is installed and running.**
5. **Create a database named `bank` and set up the necessary tables (`customers` and `transfers`) as per the schema used in the project.**

## Usage

1. Start the application:
```
npm start
```

2. Access the application through your web browser at [http://localhost:3000](http://localhost:3000).
3. Navigate through the links to view all customers, view customer details, and perform money transfers.
4. Follow the prompts and forms to execute transactions and view transaction success details.

## Project Structure

- `index.js`: Entry point of the application where Express server is configured.
- `routes/index.js`: Defines API routes for fetching customer data, handling transfers, and transaction success.
- `views/`: Contains EJS templates for rendering HTML views.
- `public/`: Stores static assets like CSS files (`css/`) for styling.

## Contributing

Contributions are welcome! If you'd like to improve this project, please fork the repository and create a pull request. You can also open issues for any bugs or feature requests.



