import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/LoginPage';
import Home from './components/Home';
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from './redux/boardsSlice';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);

  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setAuthenticated={setIsAuthenticated} />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
