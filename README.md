# Personal Blog Platform

A full-stack blog platform with React frontend and Express backend.

---

## Get Started

### 1. Clone the repository

```bash
git clone https://github.com/nadula123sankalana/personal-blog-platform-final--v.git
cd personal-blog-platform-v2

2. Install dependencies

Frontend

cd client
npm install

Backend

cd ../server
npm install

3. Configure backend environment variables

Create a .env file inside the server folder with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

4. Run the application

Frontend

cd ../client
npm run dev

This starts the frontend at http://localhost:5173.

Backend


cd ../server

npm start

This starts the backend API at http://localhost:5000.


5. Development workflow
Edit React frontend files inside the client directory.

Edit backend Express files inside the server directory.

Frontend communicates with backend API at port 5000.

