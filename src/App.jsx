// src/App.jsx 

import React from 'react';
import Home from './pages/Home'; 

function App() {
  return (
    // The outermost container should simply take up the full available width
    <div className="w-full min-h-screen">
      <Home />
    </div>
  );
}

export default App;
