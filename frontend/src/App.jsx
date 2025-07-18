<<<<<<< HEAD
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            {/* Protect the root route */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/income"
              element={
                <PrivateRoute>
                  <Income />
                </PrivateRoute>
              }
            />
            <Route
              path="/expense"
              element={
                <PrivateRoute>
                  <Expense />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
}

export default App;
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Testimonials from './pages/Testimonials'
import About from './pages/About'
import Services from './pages/Services'
import Analyzer from './Analyzer/Analyzer'

// Page Components
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="contact" element={<Contact />} />
          <Route path="analyzer" element={<Analyzer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
>>>>>>> 3b5598e8cf853d3331594446a484fe17bcec96de
