### HostelHeaven

HostelHeaven is a comprehensive web platform inspired by Airbnb, designed for adding and managing hotel listings and reviews. This project showcases a full-stack implementation using modern web technologies.

#### Features:
- **User Authentication:** Secure sign-up, sign-in, and session management.
- **Hotel Listings:** Add, update, delete, and view hotel listings.
- **Reviews:** Post, view, and manage reviews for hotels.
- **Responsive Design:** Visually appealing and user-friendly interface adaptable to various devices.

#### Technologies Used:
- **Frontend:** HTML, CSS, JavaScript, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Additional:** Middleware, session management, cookies, MVC architecture

#### Getting Started:

1. **Clone the Repository:**
   
   git clone https://github.com/imthiyasalamdev/HostelHeaven.git
   cd HostelHeaven
   

2. **Install Dependencies:**
   npm install
  

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:

   MONGODB_URI=your_mongodb_uri
   SESSION_SECRET=your_session_secret
   

4. **Run the Application:**
   
   node app.js
   

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:8000`

#### Project Structure:
```
HostelHeaven/
├── public/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── views/
├── .env
├── package.json
└── README.md


#### Contributing:
Feel free to fork this project, create a new branch, and submit a pull request. Contributions are welcome!
