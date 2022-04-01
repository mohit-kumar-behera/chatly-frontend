import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  PageLayout,
  HomePage,
  LoginPage,
  LogoutPage,
  RegisterPage,
  ChatPage,
  ChattingPage,
} from './pages';

import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = function () {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<LogoutPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route
          path="chat/:id"
          element={
            <ProtectedRoute>
              <ChattingPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
