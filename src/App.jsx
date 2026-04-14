import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InfluencerPage from "./pages/InfluencerPage";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import { FaWhatsapp } from "react-icons/fa";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import About from "./pages/About";
import Enquiries from "./pages/Enquiries";
import TeamAdmin from "./pages/TeamAdmin";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>

      {/* ✅ Navbar (global) */}
      <Navbar />

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/influencer/:slug" element={<InfluencerPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/enquiries" element={<Enquiries />} />
        <Route path="/team-admin" element={<TeamAdmin />} />
        
      </Routes>

      {/* ✅ Floating WhatsApp Button */}
      <a
        href="https://wa.me/+919644160105"
        target="_blank"
        className="fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        <FaWhatsapp size={24} />
      </a>
       <Footer />

    </BrowserRouter>
  );
}

export default App;