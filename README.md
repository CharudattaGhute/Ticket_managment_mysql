**Ticket Remarks API**
=====================

This is a REST API for managing ticket remarks. The API provides endpoints for creating, reading, updating, and deleting ticket remarks.

**Endpoints**
------------

### Create Ticket Remark

* **POST /api/addticketreamrks**
	+ Request Body: `tickettId`, `remarkid`, `createdby`, `modifiedby`
	+ Response: Created ticket remark object

### Get All Ticket Remarks

* **GET /api/getallticketreamarks**
	+ Response: Array of all ticket remark objects

### Update Ticket Remark

* **POST /api/updateticketremarks**
	+ Request Body: `tickettId`, `remarkid`, `createdby`, `modifiedby`, `ticketreamrksid`
	+ Response: Updated ticket remark object

### Delete Ticket Remark

* **POST /api/deleteticketremarks**
	+ Request Body: `ticketreamrksid`
	+ Response: Success message

**Database**
------------

The API uses a MySQL database to store ticket remark data. The database schema consists of a single table `ticketremarks` with the following columns:

* `ticketreamrksid` (primary key)
* `tickettId`
* `remarkid`
* `createdby`
* `modifiedby`

**Technology Stack**
--------------------

* Node.js
* Express.js
* MySQL

**Getting Started**
-------------------

1. Clone the repository: `git clone https://github.com/your-username/ticket-remarks-api.git`
2. Install dependencies:
#### `npm install express`,
#### `npm install mongoose`,
#### `npm install nodemon`,
#### 'npm install body-parser'
3.Create a MySQL database and update the `config/db.js` file with your database credentials
4. Start the server: `node server.js`
5. Use a tool like Postman or cURL to test the API endpoints

**License**
---------

This project is licensed under the MIT License. See the `LICENSE` file for details.

**Contributing**
------------

Contributions are welcome! If you'd like to contribute to the project, please fork the repository and submit a pull request.
