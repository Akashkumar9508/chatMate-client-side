import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Layout from './Layout.jsx';
import { Signup, Login, Dashboard, Friend, UserProfile, About , SettingsPage } from './pages/allPages.js';
import { SocketProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <SocketProvider>
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={true} />
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route path="/setting" element={<SettingsPage />} />
              <Route path='' element={<App />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="about" element={<About />} />
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="friends" element={
                <ProtectedRoute>
                  <Friend />
                </ProtectedRoute>
              } />
              <Route path='/user/:userName' element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </Provider>
    </>
);
