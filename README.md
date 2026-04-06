

# 🌱 CropSphere

CropSphere is an AI-powered agriculture platform designed to help farmers make smarter decisions using data, automation, and intelligent insights. It simplifies crop management, improves productivity, and enables better resource planning.

---

## 🚀 Features

* 🌾 **Crop Recommendation System**
  Suggests the best crops based on soil, weather, and location data.

* 📊 **Real-Time Data Insights**
  Provides analytics on crop health, yield prediction, and farming patterns.

* 🌦️ **Weather Integration**
  Helps farmers plan activities based on live weather updates.

* 🤖 **AI Assistance**
  Smart suggestions for fertilizers, irrigation, and crop care.

* 📍 **Location-Based Services**
  Personalized recommendations using geolocation data.

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* Tailwind CSS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB

**Other Tools**

* REST APIs
* Mongoose
* dotenv

---

## 📁 Project Structure

```
CropSphere/
│
├── frontend/        # React frontend
├── backend/         # Node + Express backend
│   ├── models/      # Database schemas
│   ├── controllers/ # Business logic
│   ├── routes/      # API routes
│   ├── middleware/  # Auth & error handling
│
├── .env             # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mahi-19-design/cropsphere.git
cd cropsphere
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
npm start
```

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 📡 API Endpoints (Sample)

| Method | Endpoint   | Description              |
| ------ | ---------- | ------------------------ |
| GET    | /api/crops | Get crop recommendations |
| POST   | /api/users | Register user            |
| POST   | /api/auth  | Login user               |

---

## 🎯 Use Case

CropSphere helps:

* Farmers make **data-driven decisions**
* Reduce crop failure risk
* Increase yield and efficiency

---

## 🧠 Future Enhancements

* 📷 Image-based disease detection
* 📱 Mobile app integration
* 🌍 Multilingual support
* 📈 Advanced AI predictions

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Inspiration

Built to empower farmers with technology and bring innovation to agriculture 🌍

