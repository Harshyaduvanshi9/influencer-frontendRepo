import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function InfluencerPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/influencers/${slug}`)
      .then(res => setData(res.data));
  }, [slug]);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  // ✅ Format followers (K / M)
  const formatFollowers = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  // ⭐ Top creator logic
  const isTopCreator = data.followers > 50000;

 return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    
    <div className="bg-white p-8 rounded-2xl shadow w-[420px] text-center">

      {/* 🖼️ Profile Image */}
      <img
        src={data.image || "https://via.placeholder.com/150"}
        alt={data.name}
        className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border"
      />

      {/* ⭐ Name + Badges */}
      <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
        {data.name}

        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
          Verified
        </span>

        {isTopCreator && (
          <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
            Top Creator
          </span>
        )}
      </h1>

      {/* 📂 Category */}
      <p className="text-gray-500 mt-2">{data.category}</p>

      {/* 📊 Stats */}
      <div className="mt-4 space-y-2 text-sm">
        <p>📱 <span className="font-medium">{data.platform}</span></p>
        <p>👥 <span className="font-medium">{formatFollowers(data.followers)}</span> followers</p>

        {/* 👁️ Views (FIXED POSITION) */}
        <p>👁️ <span className="font-medium">{data.views || 0}</span> profile views</p>
      </div>

      {/* 💰 Price (if exists) */}
      {data.price && (
        <p className="mt-3 font-semibold text-lg">
          💰 ₹{data.price} per promotion
        </p>
      )}

      {/* 📝 Bio */}
      <p className="mt-4 text-gray-600">{data.bio}</p>

      {/* 🔗 Social Links */}
      <div className="flex justify-center gap-4 mt-5">
        {data.youtube && (
          <a href={data.youtube} target="_blank" className="bg-red-500 text-white px-3 py-1 rounded">
            YouTube
          </a>
        )}
        {data.instagram && (
          <a href={data.instagram} target="_blank" className="bg-pink-500 text-white px-3 py-1 rounded">
            Instagram
          </a>
        )}
      </div>

      {/* 📲 WhatsApp CTA */}
      <a
        href={`https://wa.me/919644160105?text=${encodeURIComponent(
          `Hi I want to collaborate with ${data.name}`
        )}`}
        target="_blank"
        className="block mt-6 bg-green-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-green-600 transition"
      >
        💬 Contact for Collaboration
      </a>

    </div>
  </div>
);
}

export default InfluencerPage;