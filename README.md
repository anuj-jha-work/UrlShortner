# 🔗 URL Shortener with LRU Cache (Deployed)

## 📌 Overview

This is a URL Shortener application that converts long URLs into short, shareable links.
The system is deployed and includes an LRU Cache to improve performance by reducing repeated database queries.

It demonstrates backend concepts like routing, caching, API handling, and deployment.

---

## 🌐 Live Demo

* **Frontend:** https://shorturl-zyyf.onrender.com/
* **Backend API:** https://urlshort-afo0.onrender.com

### Example Short URL

https://urlshort-afo0.onrender.com/DSDZ6U13Xr

---

## 🚀 Features

* Convert long URLs into short links
* Redirect short URL to original URL
* LRU Cache for faster repeated access
* Deployed full-stack application
* Basic validation for input URLs

---

## 🛠️ Tech Stack

* Frontend: HTML, CSS
* Backend: Node.js, Express.js
* Database: MongoDB
* Deployment: Render
* Caching: LRU Cache

---

## ⚙️ System Flow

1. User opens frontend and submits a long URL
2. Frontend sends request to backend API
3. Backend generates a unique short ID
4. Mapping is stored in MongoDB
5. Short URL is returned to user

### 🔁 Redirection Flow

* User visits short URL
* System checks LRU Cache

  * ✅ If present → redirect instantly
  * ❌ If not → fetch from DB → store in cache → redirect

---

## 🧠 Key Concepts Used

* **URL Mapping:** Short ID → Original URL
* **REST APIs:** Handling requests using Express.js
* **Database Storage:** MongoDB for persistent mapping
* **LRU Cache:**

  * Stores recently accessed URLs
  * Reduces database hits
  * Improves response time
* **Deployment:** Hosted backend and frontend using Render

---

## ▶️ How to Run Locally

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```
3. Setup environment variables (MongoDB connection)
4. Start server:

   ```bash
   npm start
   ```
5. Open browser at:

   ```
   http://localhost:3000
   ```

---

## 📷 Demo

(Add screenshots or GIFs here)

---

## ⚠️ Limitations

* No authentication system
* No link expiration feature
* Basic UI
* Not designed for high-scale production

---

## 🔮 Future Improvements

* Add user authentication
* Track click analytics
* Custom short URLs
* Expiry time for links
* Better UI/UX

---

## 🤝 Acknowledgment

This project was developed with guidance from a friend and assistance from online resources and AI tools.
I ensured understanding of the backend flow, API design, and caching mechanism used.

---
