import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ NEW
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/api/influencers`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false)); // ✅ STOP LOADING
  }, []);

  const formatFollowers = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const isTopCreator = (followers) => followers > 50000;

  let filteredData = data.filter((inf) =>
    inf.name.toLowerCase().includes(search.toLowerCase())
  );

  if (platform) {
    filteredData = filteredData.filter(
      (inf) => inf.platform?.toLowerCase() === platform.toLowerCase()
    );
  }

  if (category) {
    filteredData = filteredData.filter(
      (inf) => inf.category?.toLowerCase() === category.toLowerCase()
    );
  }

  if (sort === "high") {
    filteredData.sort((a, b) => b.followers - a.followers);
  }

  if (sort === "low") {
    filteredData.sort((a, b) => a.followers - b.followers);
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-24 pb-10">

      {/* 🔥 Title */}
      <h1 className="text-4xl font-bold text-center mb-6">
        Influencer Marketplace 🚀
      </h1>

      {/* 🔍 Search */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search influencer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border shadow-sm text-sm focus:ring-2 focus:ring-black transition"
        />
      </div>

      {/* 🎯 FILTER BAR */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center mb-8">
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg border bg-white shadow-sm">
          <option value="">Sort</option>
          <option value="high">High → Low</option>
          <option value="low">Low → High</option>
        </select>

        <select value={platform} onChange={(e) => setPlatform(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg border bg-white shadow-sm">
          <option value="">Platform</option>
          <option value="youtube">YouTube</option>
          <option value="instagram">Instagram</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg border bg-white shadow-sm">
          <option value="">Category</option>
          <option value="tech">Tech</option>
          <option value="earning">Earning</option>
          <option value="education">Education</option>
          <option value="gaming">Gaming</option>
          <option value="vlog">Vlog</option>
          <option value="cricket">Cricket</option>
        </select>

        <button
          onClick={() => {
            setSort("");
            setPlatform("");
            setCategory("");
          }}
          className="px-4 py-1.5 text-sm bg-black text-white rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* 🎯 GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* 🔥 SHIMMER LOADING */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow overflow-hidden animate-pulse">

              <div className="w-full h-48 bg-gray-300"></div>

              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3 mx-auto"></div>
                <div className="h-8 bg-gray-300 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}

        {/* ✅ REAL DATA */}
        {!loading && filteredData.map((inf) => (
          <motion.div
            key={inf._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl overflow-hidden shadow hover:scale-105 transition"
          >
            <div className="relative">
              <img
                src={inf.image || "https://via.placeholder.com/300"}
                className="w-full h-48 object-cover"
              />

              {isTopCreator(inf.followers) && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded">
                  ⭐ Top Creator
                </span>
              )}
            </div>

            <div className="p-5 text-center">

              <h2 className="text-lg font-semibold flex justify-center gap-2">
                {inf.name}
                <span className="bg-blue-500 text-white text-xs px-2 rounded">
                  Verified
                </span>
              </h2>

              <p className="text-gray-500 text-sm">{inf.category}</p>

              <div className="mt-2 text-sm">
                <p>👥 {formatFollowers(inf.followers)}</p>
                <p>👁️ {inf.views || 0}</p>
              </div>

              <p className="text-green-600 font-semibold">
                ₹{inf.price}
              </p>

              <Link
                to={`/influencer/${inf.slug}`}
                className="block mt-3 bg-black text-white py-2 rounded-lg"
              >
                View Profile
              </Link>

            </div>
          </motion.div>
        ))}

      </div>

      {!loading && filteredData.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No influencers found 😔
        </p>
      )}

    </div>
  );
}

export default Home;