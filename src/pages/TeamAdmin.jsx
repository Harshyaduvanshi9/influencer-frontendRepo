import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function TeamAdmin() {
  const [team, setTeam] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

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

  const fetchTeam = () => {
    axios.get("http://localhost:5000/api/team")
      .then(res => setTeam(res.data))
      .catch(() => toast.error("Failed to load team ❌"));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/team/${editingId}`, form);
        toast.success("Member updated successfully ✏️");
      } else {
        await axios.post("http://localhost:5000/api/team", form);
        toast.success("Member added successfully 🚀");
      }

      setForm({ name: "", role: "", image: "", bio: "" });
      setEditingId(null);
      fetchTeam();

    } catch (err) {
      toast.error("Something went wrong ❌");
      console.log(err);
    }
  };

  // ✏️ Edit
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

  // ❌ Delete
  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/team/${id}`);
      toast.success("Member deleted 🗑️");
      fetchTeam();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-28 pb-10">

      <div className="max-w-6xl mx-auto">

        {/* 🔥 Header */}
        <h1 className="text-3xl font-bold mb-6 text-center">
          Team Admin Panel 👥
        </h1>

        {/* ➕ Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow mb-10 grid md:grid-cols-2 gap-4"
        >
          <h2 className="md:col-span-2 text-xl font-semibold text-center">
            {editingId ? "Update Member ✏️" : "Add Member ➕"}
          </h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-black"
            required
          />

          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role (Founder / Team)"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-black"
            required
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-3 rounded-lg"
          />

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button
            className="bg-black text-white py-3 rounded-xl md:col-span-2 hover:bg-gray-800 transition cursor-pointer"
          >
            {editingId ? "Update Member" : "Add Member"}
          </button>
        </form>

        {/* 👥 Team Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((m) => (
            <div
              key={m._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition text-center"
            >
              <img
                src={m.image || "https://via.placeholder.com/150"}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border"
              />

              <h3 className="font-semibold text-lg">{m.name}</h3>
              <p className="text-gray-500 text-sm">{m.role}</p>

              <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                {m.bio}
              </p>

              {/* 🔥 Actions */}
              <div className="flex justify-center gap-3 mt-4">

                <button
                  onClick={() => handleEdit(m)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMember(m._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
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