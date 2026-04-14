import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/api/influencers`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔢 Format followers
  const formatFollowers = (num) => {
    if (!num) return 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  // ⭐ Top Creator logic
  const isTopCreator = (followers) => followers > 50000;

  // 🔥 FILTER LOGIC
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

  // 🔽 SORT
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

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg border bg-white shadow-sm hover:shadow transition cursor-pointer"
        >
          <option value="">Sort</option>
          <option value="high">High → Low</option>
          <option value="low">Low → High</option>
        </select>

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg border bg-white shadow-sm hover:shadow transition cursor-pointer"
        >
          <option value="">Platform</option>
          <option value="youtube">YouTube</option>
          <option value="instagram">Instagram</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg border bg-white shadow-sm hover:shadow transition cursor-pointer"
        >
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
          className="px-4 py-1.5 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer hover:scale-105"
        >
          Reset
        </button>

      </div>

      {/* 🎯 GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {filteredData.map((inf) => (
          <div
            key={inf._id}
            className="bg-white rounded-2xl overflow-hidden shadow transition duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            {/* 🖼️ Image */}
            <div className="relative overflow-hidden">
              <img
                src={inf.image || "https://via.placeholder.com/300"}
                alt={inf.name}
                className="w-full h-48 object-cover transition duration-300 hover:scale-110"
              />

              {/* ⭐ Top Creator */}
              {isTopCreator(inf.followers) && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded shadow">
                  ⭐ Top Creator
                </span>
              )}
            </div>

            {/* 📦 Content */}
            <div className="p-5 text-center">

              {/* ✔ Name + Verified */}
              <h2 className="text-lg font-semibold flex items-center justify-center gap-2">
                {inf.name}
                <span className="bg-blue-500 text-white text-[10px] px-2 py-[2px] rounded">
                  Verified
                </span>
              </h2>

              {/* 📂 Category */}
              <p className="text-gray-500 text-sm mt-1">
                {inf.category}
              </p>

              {/* 📊 Stats */}
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p>👥 {formatFollowers(inf.followers)} followers</p>
                <p>👁️ {inf.views || 0} views</p>
              </div>

              {/* 💰 Price */}
              <p className="text-green-600 font-semibold mt-2">
                ₹{inf.price}
              </p>

              {/* 🔗 Button */}
              <Link
                to={`/influencer/${inf.slug}`}
                className="block mt-4 bg-black text-white py-2 rounded-lg transition hover:bg-gray-800 hover:scale-105"
              >
                View Profile
              </Link>

            </div>
          </div>
        ))}

      </div>

      {/* ❌ Empty */}
      {filteredData.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No influencers found 😔
        </p>
      )}

    </div>
  );
}

export default Home;