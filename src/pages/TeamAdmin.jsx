import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function TeamAdmin() {
  const [team, setTeam] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    role: "",
    image: "",
    bio: ""
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    fetchTeam();
  }, []);

  // 🔥 FETCH TEAM
  const fetchTeam = () => {
    setLoading(true);

    axios.get(`${API}/api/team`)
      .then(res => setTeam(res.data))
      .catch(() => toast.error("Failed to load team ❌"))
      .finally(() => setLoading(false));
  };

  // 🔄 INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API}/api/team/${editingId}`, form);
        toast.success("Member updated ✏️");
      } else {
        await axios.post(`${API}/api/team`, form);
        toast.success("Member added 🚀");
      }

      setForm({ name: "", role: "", image: "", bio: "" });
      setEditingId(null);
      fetchTeam();

    } catch {
      toast.error("Something went wrong ❌");
    }
  };

  // ✏️ EDIT
  const handleEdit = (member) => {
    setForm({
      name: member.name || "",
      role: member.role || "",
      image: member.image || "",
      bio: member.bio || ""
    });
    setEditingId(member._id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ❌ DELETE
  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await axios.delete(`${API}/api/team/${id}`);
      toast.success("Member deleted 🗑️");
      fetchTeam();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-4 pt-24 sm:pt-28 pb-10">

      <div className="max-w-6xl mx-auto">

        {/* 🔥 Header */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Team Admin Panel 👥
        </h1>

        {/* ➕ FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 rounded-2xl shadow mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <h2 className="col-span-1 sm:col-span-2 text-lg sm:text-xl font-semibold text-center">
            {editingId ? "Update Member ✏️" : "Add Member ➕"}
          </h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-3 rounded-lg w-full"
            required
          />

          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="border p-3 rounded-lg w-full"
            required
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-3 rounded-lg w-full"
          />

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="border p-3 rounded-lg w-full sm:col-span-2"
          />

          <button className="bg-black text-white py-3 rounded-xl col-span-1 sm:col-span-2 hover:bg-gray-800 transition">
            {editingId ? "Update Member" : "Add Member"}
          </button>
        </form>

        {/* 👥 TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

          {/* 🔥 SHIMMER */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 sm:p-5 rounded-2xl shadow animate-pulse text-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full mx-auto mb-3"></div>

                <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3 mx-auto mb-2"></div>

                <div className="h-3 bg-gray-300 rounded w-2/3 mx-auto"></div>
              </div>
            ))}

          {/* ✅ REAL DATA */}
          {!loading && team.map((m) => (
            <div
              key={m._id}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow hover:shadow-xl transition text-center"
            >
              <img
                src={m.image || "https://via.placeholder.com/150"}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 object-cover border"
              />

              <h3 className="font-semibold text-base sm:text-lg">{m.name}</h3>
              <p className="text-gray-500 text-xs sm:text-sm">{m.role}</p>

              <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                {m.bio}
              </p>

              {/* 🔥 ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">

                <button
                  onClick={() => handleEdit(m)}
                  className="w-full sm:w-auto px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMember(m._id)}
                  className="w-full sm:w-auto px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default TeamAdmin;