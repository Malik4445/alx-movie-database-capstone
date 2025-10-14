// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "HOME", path: "/" },
    { name: "MOVIES", path: "/movies" },
    { name: "TV SHOWS", path: "/tv-shows" },
  ];

  return (
    <nav className="flex gap-8 justify-center py-4 bg-white shadow-md">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`text-sm font-bold tracking-wide transition-colors ${
              // Using tailwind colors as a fallback for 'text-accent'
            location.pathname === item.path
              ? "text-red-600"
              : "text-gray-500 hover:text-red-400"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;