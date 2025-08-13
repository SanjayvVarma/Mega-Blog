# 📝 Mega SKBlog

**Mega SKBlog** is a modern blogging platform built with the **MERN stack** that offers a smooth and responsive experience for **authors**, **readers**, and **admins**.  
It features a secure authentication system, powerful blog management tools, and a clean, user-friendly interface.

---

## 🚀 Live Demo
🔗 **[View Live Project](https://mega-blog-seven-lovat.vercel.app)**

---

## 📌 Features

### 🖊 User Features
- 🔐 **Secure Login & Signup** with JWT and HttpOnly cookies
- 📧 **Email Verification** via OTP before registration (**Nodemailer**)
- 📝 Create, read, update, and delete blogs
- 💬 Add and delete reviews
- 🔍 Search & filter blogs with pagination
- ⚠ **Delete confirmation popups** using SweetAlert
- 📱 Fully responsive & modern UI

### 🛠 Admin Features
- 📊 **Admin Dashboard** to manage the platform
- 📰 Manage blogs, reviews, and subscribers
- 📈 View platform analytics (last 7 days hit counts)
- ✅ Review moderation system

### ✍ Author Features
- 🖥 **Author Dashboard**
- 📝 Create, update, and delete blogs
- 📂 Manage personal blog posts easily

---

## 🖥️ Tech Stack

**Frontend:**
- React.js (Vite)
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- SweetAlert for confirmation dialogs

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Nodemailer for email verification

**Other Tools & Services:**
- Cloudinary for image storage
- Postman for API testing

---

## 📂 Project Structure
```

Mega-SKBlog/
│── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── server.js
│
│── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.jsx
│
└── README.md

````

---

## ⚙️ Installation & Setup

1️⃣ **Clone the repository**
```bash
git clone https://github.com/SanjayvVarma/Mega-Blog.git
````

2️⃣ **Install dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3️⃣ **Setup environment variables**

📍 Backend `.env`

```
PORT=8080
CORS_ORIGIN=_frontend_url
MONGO_URI=_mongodb_url
ACCESS_TOKEN_SECRET=XX
ACCESS_TOKEN_EXPIRY=TT
REFRESH_TOKEN_SECRET=YR
REFRESH_TOKEN_EXPIRY=oo
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

📍 Frontend `.env`

```
VITE_API_BASE_URL=_backend_url
```

4️⃣ **Run the application**

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page Screenshot](/frontend/public/homepage.png)
![Home Page Screenshot](/frontend/public/homepage2.png)

### 📊 Admin Dashboard

![Admin Dashboard Screenshot](/frontend/public/admin%20dashboard.png)

### 📊 Author Dashboard

![Admin Dashboard Screenshot](/frontend/public/author_dashboard.png)

---

## 📈 Future Enhancements

* 🏷 Blog categories & tags
* ✍ Rich text editor for blog creation
* 📤 Social media sharing
* 💬 Comment replies & likes
* 📩 Email notifications

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome!
Fork the repo and create a pull request with your changes.

---

## 👨‍💻 Author

**Sanjay Varma**

📧 Email: [skvarma914@gmail.com](mailto:skvarma914@gmail.com)
🔗 [Portfolio](https://portfolio2-sanjay-varma.vercel.app/) | [LinkedIn](https://www.linkedin.com/in/sanjaykvarma) | [GitHub](https://github.com/SanjayvVarma)

---