import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function Dashboard() {
  const [influencers, setInfluencers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  const exportLeads = () => {
    if (leads.length === 0) {
      alert("No leads to export ❌");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(leads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    XLSX.writeFile(workbook, "leads.xlsx");
  };

  const formatFollowers = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    Promise.all([
      axios.get(`${API}/api/influencers`),
      axios.get(`${API}/api/leads`)
    ])
      .then(([infRes, leadRes]) => {
        setInfluencers(infRes.data);
        setLeads(leadRes.data);
      })
      .catch(() => {
        alert("Error loading dashboard ❌");
      })
      .finally(() => setLoading(false));

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-28 pb-10">

      {/* 🔥 Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard 📊</h1>

        <button
          onClick={exportLeads}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow"
        >
          Export Leads
        </button>
      </div>

      {/* 🔥 SHIMMER */}
      {loading && (
        <div className="max-w-6xl mx-auto">

          {/* Stats shimmer */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow animate-pulse text-center">
                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-3"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto"></div>
              </div>
            ))}
          </div>

          {/* Influencer shimmer */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow animate-pulse">
                <div className="w-full h-36 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>

          {/* Leads shimmer */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ✅ REAL DATA */}
      {!loading && (
        <>
          {/* 📊 Stats */}
          <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <p className="text-gray-500">Influencers</p>
              <h2 className="text-2xl font-bold">{influencers.length}</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow text-center">
              <p className="text-gray-500">Leads</p>
              <h2 className="text-2xl font-bold">{leads.length}</h2>
            </div>
          </div>

          {/* 👥 Influencers */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Influencers</h2>

            {influencers.length === 0 ? (
              <p className="text-gray-500">No influencers found</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {influencers.map((inf) => (
                  <div key={inf._id} className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition">
                    <img
                      src={inf.image || "https://via.placeholder.com/300"}
                      className="w-full h-36 object-cover rounded mb-3"
                    />

                    <p className="font-semibold">{inf.name}</p>

                    <p className="text-sm text-gray-600">
                      👥 {formatFollowers(inf.followers)}
                    </p>

                    <p className="text-sm text-gray-600">
                      👁️ {inf.views || 0}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 📩 Leads */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Leads</h2>

            {leads.length === 0 ? (
              <p className="text-gray-500">No leads yet 😔</p>
            ) : (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead._id} className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                    <p className="font-semibold">
                      {lead.name} ({lead.email})
                    </p>

                    <p className="text-sm mt-1">
                      💰 Budget: {lead.budget}
                    </p>

                    <p className="text-gray-600 text-sm mt-2">
                      {lead.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default Dashboard;