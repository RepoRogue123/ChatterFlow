
<img src="frontend/public/left_image.jpg" alt="ChatterFlow Banner" style="width:100%; max-height:300px; object-fit:cover;" />


# 💬 ChatterFlow – Real-Time Full-Stack Chat Application

ChatterFlow is a fully responsive, real-time chat application designed to deliver seamless messaging experiences over the web. Built with the MERN stack (MongoDB, Express.js, React, Node.js), ChatterFlow blends powerful backend APIs with a polished frontend UI, providing users with the ability to communicate instantly and securely. It supports real-time one-on-one messaging via WebSockets, media sharing through Cloudinary, and a modern, dynamic interface powered by Vite and TailwindCSS.

The application follows a modular and scalable architecture. The backend adheres to the Model-View-Controller (MVC) pattern, separating logic into manageable parts, while the frontend uses reusable components and state management to ensure smooth navigation and interaction. With built-in JWT-based authentication, efficient socket communication, and performance optimizations, ChatterFlow is both robust for developers and intuitive for users.

---

## 🌐 Live Website

🔗 [https://chatter-flow-mu.vercel.app/login](https://chatter-flow-mu.vercel.app/login)

---

## 🧩 Project Overview

ChatterFlow enables users to engage in one-on-one real-time conversations with features like image sharing, secure login, and sleek user interface design. The backend is organized using MVC principles and integrated with Cloudinary for handling media. The frontend is built with React, styled using TailwindCSS, and optimized through Vite.

---

## 🚀 Key Features

- ⚡ Real-time messaging with Socket.io
- 🔐 JWT-based authentication and secure API endpoints
- 🖼️ Media uploads through Cloudinary integration
- 💻 Responsive and modern UI with React + TailwindCSS
- 🧱 MVC-structured backend with Express.js and MongoDB
- 🧠 State management and skeleton loaders for smooth UX

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB, Socket.io
- **Media**: Cloudinary
- **State Management**: Zustand (or Context API)
- **Others**: ESLint, Prettier, Husky, dotenv

---

## 🧪 Getting Started

### ✅ Prerequisites

- Node.js (>= 18.x)
- MongoDB instance
- Cloudinary account

### ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/reporogue123/chatterflow.git
cd chatterflow

# Setup backend
cd backend
cp .env.example .env
npm install
npm run dev

# Setup frontend (in a new terminal)
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

Visit `http://localhost:5173` to use the application locally.

---

## 🔧 Configuration

### Backend (.env)

```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:4000
```

---


## 📌 Roadmap

- 👥 Add group chat functionality
- 💬 Message reactions and read receipts
- 🔔 Push notifications (PWA support)
- 🐳 Docker and CI/CD setup

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the project, raise issues, or submit pull requests.

```bash
# Example contribution flow
git checkout -b feature/my-feature
npm run dev
# Make changes
git commit -m "Add new feature"
git push origin feature/my-feature
```

---

## 📬 Contact

Feel free to reach out via [LinkedIn](https://www.linkedin.com/in/atharva-honparkhe-6ba05a2aa/) or [GitHub](https://github.com/reporogue123).
