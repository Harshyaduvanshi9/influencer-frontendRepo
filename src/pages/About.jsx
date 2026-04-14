import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function About() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ NEW
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/api/team`)
      .then(res => setTeam(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false)); // ✅ STOP LOADING
  }, []);

  const founders = team.filter(m => m.role === "Founder" || m.role === "Co-Founder");
  const members = team.filter(m => m.role === "Team");

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-28 pb-12">

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">About Us 💼</h1>
        <p className="text-gray-600 text-lg">
          We connect brands with top influencers to create impactful collaborations.
        </p>
      </motion.div>

      {/* 🔥 SHIMMER LOADING */}
      {loading && (
        <div className="max-w-6xl mx-auto">

          {/* Founder shimmer */}
          <div className="mb-12">
            <div className="h-6 bg-gray-300 rounded w-60 mx-auto mb-8 animate-pulse"></div>

            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow text-center animate-pulse">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/3 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Team shimmer */}
          <div>
            <div className="h-6 bg-gray-300 rounded w-40 mx-auto mb-8 animate-pulse"></div>

            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow text-center animate-pulse">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/3 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ✅ REAL CONTENT */}
      {!loading && (
        <>
          {/* Founder Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Founder & Co-Founder
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {founders.map((person, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-2xl shadow text-center"
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold">{person.name}</h3>
                  <p className="text-gray-500">{person.role}</p>
                  <p className="text-gray-600 mt-2 text-sm">{person.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Our Team 👥
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {members.map((person, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-2xl shadow text-center"
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-gray-500 text-sm">{person.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default About;