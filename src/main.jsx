// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import {Provider} from 'react-redux';
import store from './store/store.js';
import Friend from './pages/Friend.jsx';

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={true} />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />
          <Route path="/friends" element={
            <ProtectedRoute>
              <Friend />
            </ProtectedRoute>
          }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);
