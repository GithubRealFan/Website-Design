import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import StartUp from "./pages/StartUp";
import FirstPage from "./pages/FirstPage";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import Account from "./pages/Account";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<StartUp/>}/>
          <Route path="/FirstPage" element={<FirstPage/>}/>
          <Route path="/AboutMe" element={<AboutMe/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/Account" element={<Account/>}/>
        </Routes>
      </Router>
  );
}

export default App;
