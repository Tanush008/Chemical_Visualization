# 🧪 Chemical Equipment Parameter Visualizer
## Hybrid Web + Desktop Application

A feature-rich analytics platform offering the ability to upload, visualize, analyze, and compare chemical equipment datasets via a Web Dashboard and a Desktop Application, both powered by a unified Django REST backend.

---

## 📌 Project Overview
The **Chemical Equipment Parameter Visualizer** allows users to upload datasets containing critical parameters such as:
- **Equipment Name**  
- **Equipment Type**  
- **Flowrate**  
- **Pressure**  
- **Temperature**  

It facilitates:
- **Historical Upload Management** – List and manage historical uploads.  
- **Detailed Analytics** – Visualize dataset summaries, charts, and alerts.  
- **Comparisons** – Compare multiple datasets side-by-side.  
- **PDF Reporting** – Comprehensive reports with one click.
- **Secure Access** – User authentication for data privacy.

This hybrid architecture showcases both web and desktop client consumption of shared APIs.

---

## 🧰 Tech Stack
### Backend:
- Python + Django
- Django REST Framework
- Pandas (Processing)
- SQLite (Database)
- ReportLab (PDF Generator)

### Frontend (Web):
- React.js
- Tailwind CSS
- Chart.js (Visualizations)
- React Router
- Clerk Authentication

### Desktop App:
- PyQt5
- Matplotlib
- Requests

---

## ✨ Features
- [x] **🔐 Authentication**: Powered by Clerk. Includes user signup, login, and logout mechanisms.
- [x] **📤 Uploads**: Allow validated dataset uploads with duplicate name checks.
- [x] **📊 Analytical Insights**:
  - Total Equipment Count
  - Averages for Flowrate, Pressure, and Temperature
  - Equipment Type Distribution
- [x] **⚠️ Threshold Alerts**:
  - High-pressure alerts
  - High-temperature notifications
- [x] **🗂️ History Synchronization**: List and remove datasets dynamically from both web and desktop applications with backend syncing.
- [x] **🔍 Dataset Insights**:
  - Summaries, Cards
  - High-contrast Chart Visuals
- [x] **🔄 Dual-Dataset Comparisons**
- [x] **📄 PDF Report**
- [x] **Desktop Integration**: Full symmetry with the web application, Python-driven.

---

## 🪜 Project Structure
```
Chemical_visualisation/
│
├── backend/
│   ├── analytics/            # Analytics logic
│   ├── backend/              # Django settings
│   └── db.sqlite3            # Database
│
├── web-frontend/
│   ├── src/                  # React components & views
│   ├── public/
│   └── package.json          # Project Dependencies
│
├── desktop_app/
│   └── main.py               # Desktop App Manager
│
└── README.md                 # Documentation
```

---

## ⚙️ Getting Started
### ✅ Prerequisites
- Python >= 3.9  
- Node.js >= 18  
- npm (Latest)
- Virtual Env Setup (Optional but Recommended)

### 🚀 Backend Setup (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate # Mac/Linux or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Access at: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### 🌐 Web Frontend Setup (React)
```bash
cd web-frontend
npm install
npm start
```
Access at: [http://localhost:3000/](http://localhost:3000/)

### 🖥️ Desktop Setup (PyQt5)
```bash
cd desktop_app
pip install pyqt5 matplotlib requests
python main.py
```

---

## 👤 Author
Created and maintained by **Tanush Aggarwal**.