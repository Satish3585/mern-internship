Task 1 — RESTful API (Node + Express + MongoDB)

## 📌 Objective
Build a CRUD REST API for a Products resource using 
Node.js, Express.js and MongoDB with Mongoose.

---

## 🛠️ Technologies Used
- Node.js — JavaScript runtime
- Express.js — Web framework
- MongoDB — Database
- Mongoose — MongoDB object modeling
- Morgan — HTTP request logger
- Dotenv — Environment variables

---

## 📁 Project Structure
task1-api/
├── config/
│   └── db.js                 → Database connection
├── controllers/
│   └── productController.js  → Business logic
├── middleware/
│   ├── errorHandler.js       → Central error handling
│   └── customError.js        → Custom error class
├── models/
│   └── Product.js            → Mongoose schema
├── routes/
│   └── productRoutes.js      → API routes
├── .env.example              → Environment variables template
├── server.js                 → Entry point
└── README.md                 → Documentation

---

## ⚙️ Setup & Installation

### Step 1 — Clone the Repository
git clone [your-github-repo-link]
cd task1-api

### Step 2 — Install Dependencies
npm install

### Step 3 — Setup Environment Variables
cp .env.example .env
Fill in your values in `.env` file:
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopDB

### Step 4 — Run the Server
node server.js

Server runs on → http://localhost:5000

---

## 🌐 API Endpoints

### Base URL
http://localhost:5000

### Products Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | Get all products |
| GET | /products/:id | Get single product |
| POST | /products | Create new product |
| PUT | /products/:id | Update entire product |
| PATCH | /products/:id | Partial update product |
| DELETE | /products/:id | Delete product |

---

## 📦 Sample Requests

### GET All Products
GET http://localhost:5000/products
Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64abc123...",
      "name": "iPhone 15",
      "price": 79999,
      "stock": 50
    }
  ]
}
```

### POST Create Product
POST http://localhost:5000/products
Content-Type: application/json
{
"name": "iPhone 15",
"price": 79999,
"stock": 50,
"description": "Apple iPhone 15 128GB"
}
Response:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "64abc123...",
    "name": "iPhone 15",
    "price": 79999,
    "stock": 50,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### PUT Update Product
PUT http://localhost:5000/products/:id
Content-Type: application/json
{
"name": "iPhone 15 Pro",
"price": 89999,
"stock": 40,
"description": "Updated iPhone"
}

### PATCH Partial Update
PATCH http://localhost:5000/products/:id
Content-Type: application/json
{
"price": 75000
}

### DELETE Product
DELETE http://localhost:5000/products/:id
Response:
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## ❌ Error Handling

### Invalid MongoDB ID
```json
{
  "success": false,
  "error": "Resource not found with id: invalidid123"
}
```

### Missing Required Fields
```json
{
  "success": false,
  "error": "Product name is required"
}
```

### Product Not Found
```json
{
  "success": false,
  "error": "Product not found"
}
```

---

## 📊 HTTP Status Codes Used

| Code | Meaning |
|------|---------|
| 200 | OK — Success |
| 201 | Created — New product added |
| 400 | Bad Request — Invalid data |
| 404 | Not Found — Product doesn't exist |
| 500 | Server Error — Something went wrong |

---

## 🔐 Environment Variables

See `.env.example` for required variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/<your-database-name>

---

## 📮 Postman Collection
Import `Task1_Postman_Collection.json` 
into Postman to test all endpoints directly.

---

## 👨‍💻 Author
- Name: [Your Name]
- Internship: InternSpark MERN Stack
- Task: 1 of 4