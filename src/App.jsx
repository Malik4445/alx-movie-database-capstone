// src/App.jsx

import Home from './pages/Home';
// Import Tailwind CSS styles if you haven't already (e.g., in index.css)
// import './index.css'; 

function App() {
  return (
    // You can add a main wrapper div with a light background or padding here
    <div className="min-h-screen bg-gray-100">
      <Home />
    </div>
  );
}

export default App;
