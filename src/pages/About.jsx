import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function About() {
  const [team, setTeam] = useState([]);
  const API = import.meta.env.VITE_API_URL;


  useEffect(() => {
    axios.get(`${API}/api/team`)
      .then(res => setTeam(res.data))
      .catch(err => console.log(err));
  }, []);

  // Separate roles
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

    </div>
  );
}

export default About;