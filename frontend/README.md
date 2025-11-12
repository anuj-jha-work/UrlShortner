# URL Shortener Frontend

A modern, responsive URL shortener application built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **URL Shortening**: Create short, shareable links from long URLs
- **User Authentication**: Register and login to track your URLs
- **Dashboard**: View and manage all your shortened URLs
- **My URLs**: View only your personal shortened URLs (requires authentication)
- **Analytics**: Track clicks for each shortened URL
- **Expiration**: Set custom expiration times for URLs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Guest Access**: Create URLs without authentication

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **State Management**: React Context API (Auth)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Backend server running (see backend folder)

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000/api
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

## 🗂️ Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Auth/        # Authentication components (Login, Register)
│   │   ├── Container/   # Layout container
│   │   ├── Dashboard/   # Dashboard component
│   │   ├── Footer/      # Footer component
│   │   ├── Header/      # Header and navigation
│   │   ├── MyUrls/      # User's URLs component
│   │   ├── Url/         # URL-related components
│   │   ├── Button.tsx   # Reusable button component
│   │   ├── LoadingBar.tsx # Loading indicator
│   │   ├── Logo.tsx     # Logo component
│   │   └── index.ts     # Component exports
│   ├── configs/         # Configuration files
│   │   └── constants.ts # App constants
│   ├── contexts/        # React Context providers
│   │   └── AuthContext.tsx # Authentication context
│   ├── pages/           # Page components
│   │   ├── Home.tsx     # Home page
│   │   ├── DashboardPage.tsx # Dashboard page
│   │   ├── LoginPage.tsx # Login page
│   │   ├── RegisterPage.tsx # Register page
│   │   ├── MyUrlsPage.tsx # My URLs page
│   │   └── index.ts     # Page exports
│   ├── services/        # API service layers
│   │   ├── authService.ts # Authentication API service
│   │   ├── urlService.ts # URL API service
│   │   └── index.ts     # Service exports
│   ├── App.tsx          # Main app component
│   ├── App.css          # App styles
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔑 Key Components

### Pages
- `Home.tsx` - Landing page with URL shortener form
- `DashboardPage.tsx` - Dashboard showing all shortened URLs
- `LoginPage.tsx` - User login page
- `RegisterPage.tsx` - User registration page
- `MyUrlsPage.tsx` - User's personal URLs (protected)

### Components
- `Auth/Login.tsx` - Login form component
- `Auth/Register.tsx` - Registration form component
- `Header/Header.tsx` - Navigation header with auth status
- `Footer/Footer.tsx` - Site footer
- `Url/UrlShortener.tsx` - URL shortening form
- `Dashboard/Dashboard.tsx` - Dashboard with URL list
- `MyUrls/MyUrls.tsx` - User's personal URL list
- `Container/Container.tsx` - Layout container
- `Button.tsx` - Reusable button component
- `LoadingBar.tsx` - Loading indicator
- `Logo.tsx` - App logo component

### Services
- `authService.ts` - Authentication API calls (login, register, logout)
- `urlService.ts` - URL API calls (create, fetch, etc.)

### Contexts
- `AuthContext.tsx` - Authentication state management

## 🌟 Features in Detail

### Authentication
- **Register**: Create a new account with name, email, and password
- **Login**: Sign in with email and password
- **Auto Login**: Stay logged in across sessions
- **Protected Routes**: Some pages require authentication
- **Logout**: Sign out securely

### URL Shortener
- Paste any long URL
- Set expiration time (1 day to 1 year)
- Get instant short URL
- Copy to clipboard with one click
- Works for both authenticated and guest users
- Authenticated users' URLs are automatically linked to their account

### Dashboard
- View all shortened URLs
- See click statistics
- Check expiration status
- Copy or visit links directly
- Refresh to get latest data

### My URLs (Authenticated Users Only)
- View only your personal URLs
- Track your URL performance
- Manage your shortened links
- See detailed statistics

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use, you can specify a different port:
```bash
npm run dev -- --port 3001
```

### Backend Connection Issues
Make sure the backend server is running on the port specified in your `.env` file.

### Build Errors
Try clearing the cache and reinstalling dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```
