Django and React Setup
This project consists of a Django backend and a React frontend. The Django app serves as the backend API, and the React app provides the frontend.

Prerequisites
Before you start, make sure you have the following installed on your machine:

Python 3.x
Django (installed via pip install django)
Node.js and npm (required to run React)
Yarn (optional, but recommended for React package management)

Backend (Django)
Set up a virtual environment: Create and activate a virtual environment for your Django backend.
python3 -m venv venv
source venv/bin/activate # On Windows, use `venv\Scripts\activate`

Install Django and dependencies: Install the required Python packages.
pip install -r requirements/base.txt

Set up the Django database: Run the migrations to set up your database schema.
python manage.py migrate

Start the Django development server: To run the Django app locally, use the following command:
python manage.py runserver
Your Django backend will be running at http://127.0.0.1:8000.

Frontend (React)
Install Node.js dependencies: Navigate to the frontend folder and install the dependencies using Yarn:
cd frontend
yarn install

Start the React development server: Run the following command to start the React app in development mode:
yarn dev
Your React frontend will be running at http://localhost:5173. run this url on browser
# media_management
