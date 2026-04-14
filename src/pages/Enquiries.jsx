import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Enquiries() {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:5000/api/leads")
      .then(res => setLeads(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-28 pb-10">

      {/* 🔥 Title */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Client Enquiries 📩
      </h1>

      {/* 🎯 Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        {leads.map((lead) => (
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
      {leads.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No enquiries yet 😔
        </p>
      )}
    </div>
  );
}

export default Enquiries;