import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userMode, logout } = useAuth();

  const isAuthenticated = userMode === "user";

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/ChooseAccess");
  };

  const handleHomeClick = () => {
    if (isAuthenticated) {
      navigate("/Home");
    } else {
      navigate("/Welcome");
    }
  };

  const guestLinks = [
    { to: "/ExploreCases", label: "Explore Cases" },
    { to: "/InfoCenter", label: "Info Center" },
    { to: "/Forum", label: "Community Forum" },
    { to: "/Login", label: "Log In" },
    { to: "/CreateAccount", label: "Create Account" },
  ];

  const authedLinks = [
    { to: "/Dashboard", label: "Dashboard" },
    { to: "/SubmitReport", label: "Submit Report" },
    { to: "/ExploreCases", label: "Explore Cases" },
    { to: "/InfoCenter", label: "Info Center" },
    { to: "/Forum", label: "Community Forum" },
    { to: "/Home", label: "Home" },
  ];

  const links = isAuthenticated ? authedLinks : guestLinks;

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Home Icon / Logo */}
        <div
          className="navbar-logo"
          onClick={handleHomeClick}
          style={{ cursor: "pointer" }}
        >
          SW
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="hamburger-btn"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="hamburger-icon" />
        </button>

        {/* Navigation links */}
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link ${isActive ? "active-link" : ""}`}
            >
              {label}
            </NavLink>
          ))}

          {isAuthenticated && (
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}