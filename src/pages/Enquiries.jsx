import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Enquiries() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ NEW
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios.get(`${API}/api/leads`)
      .then(res => setLeads(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false)); // ✅ STOP LOADING
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-28 pb-10">

      {/* 🔥 Title */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Client Enquiries 📩
      </h1>

      {/* 🎯 Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        {/* 🔥 SHIMMER */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow animate-pulse"
            >
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3 mb-3"></div>

              <div className="h-3 bg-gray-300 rounded w-2/3 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>
          ))}

        {/* ✅ REAL DATA */}
        {!loading && leads.map((lead) => (
          <div
            key={lead._id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">
              {lead.name}
            </h2>

            <p className="text-gray-500 text-sm">
              {lead.email}
            </p>

            <p className="mt-2 text-sm">
              💰 Budget: <span className="font-medium">{lead.budget}</span>
            </p>

            <p className="mt-3 text-gray-600 text-sm">
              {lead.message}
            </p>
          </div>
        ))}

      </div>

      {/* ❌ Empty */}
      {!loading && leads.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No enquiries yet 😔
        </p>
      )}

    </div>
  );
}

export default Enquiries;