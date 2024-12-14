# Learnify 📚  
An educational platform designed to enhance online learning experiences, enabling users to explore, manage, and interact with courses efficiently.

## Table of Contents
1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)   
4. [Usage](#usage)  
5. [Environment Variables](#environment-variables)  
6. [Folder Structure](#folder-structure)  
7. [Contributing](#contributing)  

---

## Overview 🚀
Learnify is an edtech platform inspired by **StudyNotion** and influenced by Love Babbar's **CodeHelp**. It provides an intuitive and responsive user interface for learners to manage and access their educational resources, with backend support for authentication, course creation, and file management.

---

## Features ✨
- **User Authentication**: Secure login, signup, and protected routes.  
- **Course Management**: Add, view, and manage courses seamlessly.  
- **File Upload**: Video uploads with drag-and-drop functionality using `react-dropzone`.    
- **Dynamic Multi-Step UI**: Smooth multi-step forms for course creation with step-based navigation.  
- **Payment Integration**: Razorpay integration for seamless payments.  
- **Real-Time Validation**: Form validation using `react-hook-form` and `Yup`.  

---

## Tech Stack 🛠️
Learnify is built using the **MERN Stack** and other powerful tools:  

### Frontend:
- **React.js** with **React Router**  
- **Redux** for state management  
- **Tailwind CSS** for styling  
- **React Icons** for icons  

### Backend:
- **Node.js** and **Express.js**  
- **MongoDB** as the database  
- **JWT** for user authentication  
- **Multer** for file uploads  

### Other Tools:
- **Razorpay** for payment integration  
- **React Hot Toast** for notifications  
- **Day.js** for date management  

---

### Prerequisites:
- **Node.js** and **npm** (or Yarn)  
- **MongoDB** installed locally or cloud setup (e.g., MongoDB Atlas)  

### Steps to Run:
1. **Clone the repository**:  
   ```bash
   git clone https://github.com/your-username/learnify.git
   cd learnify
   ```

2. **Install dependencies**:  
   Run the following commands for both frontend and backend:  
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../src
   npm install
   ```

3. **Set up environment variables**:  
   Create `.env` files in the `server` and `src` directories.  
   Example for **server**:  
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   ```

4. **Run the application**:  
   Open two terminals:  
   ```bash
   # Run backend server
   cd server
   npm run dev

   # Run frontend app
   cd ../src
   npm start
   ```

5. Open your browser and visit:  
   ```bash
   http://localhost:3000
   ```

---

## Usage 💡
1. **User Authentication**: Sign up or log in to access the dashboard.  
2. **Manage Courses**: Create, upload videos, and manage courses.  
3. **Payment**: Use Razorpay for course payments.  
4. **Explore Features**: Add tags, test protected routes, and enjoy dynamic forms.  

---

## Folder Structure 📂
```plaintext
Learnify/
├── node_modules/
├── public/
├── server/
│   ├── config/           # Configuration files
│   ├── controllers/      # Controller logic
│   ├── middlewares/      # Middleware functions
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── .env              # Server environment variables
│   ├── index.js          # Main server file
├── src/                  # React frontend
│   ├── components/       # Reusable components
│   ├── pages/            # Application pages
│   ├── redux/            # Redux setup
│   ├── utils/            # Helper functions
│   ├── App.js            # Root component
│   ├── index.js          # React DOM rendering
├── .gitignore            # Ignored files
├── package.json          # Project metadata
├── README.md             # Project documentation
```

---

## Contributing 🤝
Contributions are welcome! Follow these steps:  
1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature-branch`.  
3. Commit changes: `git commit -m "Add new feature"`.  
4. Push to the branch: `git push origin feature-branch`.  
5. Open a pull request.  

---

## Acknowledgments 💙
Special thanks to resources and inspirations like:  
- Love Babbar's **CodeHelp**  
- StudyNotion  
- The MERN stack community  