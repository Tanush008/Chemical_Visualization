🧪 Chemical Equipment Parameter Visualizer
Hybrid Web + Desktop Application

A hybrid analytics platform that enables users to upload, visualize, analyze, and compare chemical equipment datasets through both a Web Dashboard and a Desktop Application, powered by a common Django REST backend.

📌 Project Overview

The Chemical Equipment Parameter Visualizer allows users to upload CSV/Excel datasets containing chemical equipment parameters such as:

Equipment Name

Equipment Type

Flowrate

Pressure

Temperature

The system processes this data using Pandas, generates summary analytics, alerts, visualizations, and allows users to:

View historical uploads

Visualize individual datasets in detail

Compare multiple datasets

Generate PDF reports

Access the system securely using authentication

This project demonstrates real-world hybrid architecture, where both Web and Desktop clients consume the same backend APIs.

🧰 Tech Stack
Backend
Python
Django

Django REST Framework

Pandas

SQLite

ReportLab (PDF generation)

Frontend (Web)

React.js

Tailwind CSS

Chart.js

React Router

Clerk Authentication

Frontend (Desktop)

PyQt5

Matplotlib

Requests

✨ Features Implemented
🔐 Authentication

Secure user authentication using Clerk

Protected dashboard and dataset views

📤 Dataset Upload

Upload CSV or Excel files

Backend validation

Duplicate dataset prevention (by name)

📊 Data Analytics

Total equipment count

Average flowrate

Average pressure

Average temperature

Equipment type distribution

⚠️ Alerts

Automatic alerts for:

High average pressure

High average temperature

Displayed in both Web and Desktop apps

🗂️ History Management

Stores last 5 uploaded datasets

View, delete, and manage datasets

Backend-synced deletion for consistency

🔍 Dataset Visualization

Dedicated dataset detail page

Summary cards

Charts

Alerts explanation

🔄 Dataset Comparison

Select exactly two datasets

Side-by-side comparison

Safe state management

Error-proof selection logic

📄 PDF Report Generation

One-click PDF download

Includes dataset summary

Generated on backend

💾 Frontend State Persistence

Uses localStorage

Dataset view survives page reloads

🖥️ Desktop Application

Upload datasets

View existing datasets

Handle duplicate uploads

Visualize charts using Matplotlib

Same analytics as web app

Chemical_visualisation/
│
├── backend/
│ ├── analytics/
│ │ ├── models.py
│ │ ├── views.py
│ │ ├── utils.py
│ │ ├── urls.py
│ │ └── admin.py
│ ├── backend/
│ │ └── settings.py
│ ├── db.sqlite3
│ └── manage.py
│
├── web-frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.js
│ └── package.json
│
├── desktop_app/
│ └── main.py
│
└── README.md

⚙️ How to Run the Project
✅ Prerequisites

Python 3.9+

Node.js 18+

npm

Virtual environment (recommended)

🚀 Backend Setup (Django)
cd backend
python -m venv venv
venv\Scripts\activate # Windows
source venv/bin/activate # Mac/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

Backend runs at:

http://127.0.0.1:8000/

🌐 Web Frontend Setup (React)
cd web-frontend
npm install
npm start

Web app runs at:

http://localhost:3000/

🖥️ Desktop App Setup (PyQt5)
cd desktop_app
pip install pyqt5 matplotlib requests
python main.py

👤 Author

Tanush Aggarwal
