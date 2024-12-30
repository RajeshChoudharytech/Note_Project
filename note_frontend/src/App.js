import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotesPage from './pages/NoteList';
import AddNotePage from './pages/AddNotes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/notes" element={<NotesPage />} />
        <Route path="/add-note" element={<AddNotePage />} />
        <Route path="/edit-note/:noteId" element={<AddNotePage />} />
      </Routes>
    </Router>
  );
}

export default App;
