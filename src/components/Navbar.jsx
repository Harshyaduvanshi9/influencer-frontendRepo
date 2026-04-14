import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md">

      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* 🔥 LOGO + BRAND */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 rounded-full object-cover shadow"
          />

          <div className="leading-tight">
            <h1 className="text-sm font-bold text-gray-800">
              Upset
            </h1>
            <p className="text-[12px] text-gray-500 tracking-wide">
              Media Marketing
            </p>
          </div>
        </div>

        {/* 💻 Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">

          <Link to="/" className="hover:text-black transition">
            Home
          </Link>

          <Link to="/about" className="hover:text-black transition">
            About
          </Link>

          {/* Contact / Enquiries */}
          {isLoggedIn ? (
            <Link to="/enquiries" className="hover:text-black transition">
              Enquiries
            </Link>
          ) : (
            <Link to="/contact" className="hover:text-black transition">
              Contact
            </Link>
          )}

          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:text-black transition">
                Dashboard
              </Link>

              <Link to="/admin" className="hover:text-black transition">
                Add
              </Link>

              <Link to="/team-admin" className="hover:text-black transition">
                Team
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* 📱 Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4 flex flex-col gap-4 text-gray-700 font-medium">

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>

          {isLoggedIn ? (
            <Link to="/enquiries" onClick={() => setMenuOpen(false)}>
              Enquiries
            </Link>
          ) : (
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          )}

          {isLoggedIn ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>

              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                Add Influencer
              </Link>

              <Link to="/team-admin" onClick={() => setMenuOpen(false)}>
                Team Admin
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-500 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-black text-white px-4 py-2 rounded-lg text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;