# Task 2 — Frontend SPA with React

## 📌 Objective
A React single-page application that consumes the Task 1 
REST API to display, create, update and delete products.

---

## 🛠️ Technologies Used
- React.js — UI library
- React Router DOM — Client-side routing
- Axios — HTTP client for API calls

---

## 📁 Project Structure
task2-react-frontend/

├── src/

│   ├── components/

│   │   ├── Navbar.js

│   │   └── ProductCard.js

│   ├── pages/

│   │   ├── HomePage.js

│   │   ├── AddProductPage.js

│   │   └── EditProductPage.js

│   ├── services/

│   │   └── productService.js

│   ├── App.js

│   └── index.js

└── package.json

---

## ⚙️ Setup & Installation
git clone [your-github-link]

cd task2-react-frontend

npm install

npm start

App runs on → http://localhost:3000

**Important:** Task 1 backend must be running on 
http://localhost:5000 for the app to work.

---

## 🌐 Routes

| Route | Page | Description |
|-------|------|-------------|
| / | HomePage | Shows all products |
| /add | AddProductPage | Add new product form |
| /edit/:id | EditProductPage | Edit existing product |

---

## ✨ Features
- View all products fetched from MongoDB via API
- Add new products with form validation
- Edit existing products (pre-filled form)
- Delete products with confirmation
- Loading and error states
- Client-side routing with React Router

---

## 🔌 API Integration
All API calls are centralized in `src/services/productService.js`:
```javascript
getAllProducts()     → GET all products
getProductById(id)   → GET single product
createProduct(data)  → POST new product
updateProduct(id)    → PUT update product
deleteProduct(id)    → DELETE product
```

---

## 👨‍💻 Author
- Name: [Your Name]
- Internship: InternSpark MERN Stack
- Task: 2 of 4