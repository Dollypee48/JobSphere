import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Jobs", to: "/jobs" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobSphere
        </Link>
        <nav className="space-x-6 text-gray-700 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`hover:text-blue-600 transition ${
                location.pathname === item.to ? "text-blue-600" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
