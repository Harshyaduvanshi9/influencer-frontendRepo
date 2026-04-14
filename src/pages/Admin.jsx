import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Admin() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    platform: "",
    followers: "",
    category: "",
    bio: "",
    image: "",
    youtube: "",
    instagram: "",
    price: ""
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login first ❌");
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = () => {
    setPageLoading(true);

    axios.get(`${API}/api/influencers`)
      .then((res) => setData(res.data))
      .catch(() => toast.error("Failed to load data ❌"))
      .finally(() => setPageLoading(false));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editingId) {
        await axios.put(`${API}/api/influencers/${editingId}`, form);
        toast.success("Influencer updated ✏️");
      } else {
        await axios.post(`${API}/api/influencers`, form);
        toast.success("Influencer added 🚀");
      }

      setForm({
        name: "",
        platform: "",
        followers: "",
        category: "",
        bio: "",
        image: "",
        youtube: "",
        instagram: "",
        price: ""
      });

      setEditingId(null);
      fetchData();

    } catch {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (inf) => {
    setForm({ ...inf });
    setEditingId(inf._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteInfluencer = async (id) => {
    if (!window.confirm("Delete this influencer?")) return;

    try {
      await axios.delete(`${API}/api/influencers/${id}`);
      toast.success("Influencer deleted 🗑️");
      fetchData();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-4 pt-24 sm:pt-28 pb-10">

      <div className="max-w-6xl mx-auto">

        {/* 🔥 FORM */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl shadow mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
            {editingId ? "Update Influencer ✏️" : "Add Influencer 🚀"}
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" onSubmit={handleSubmit}>

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-3 rounded-lg w-full" required />
            <input name="platform" value={form.platform} onChange={handleChange} placeholder="Platform" className="border p-3 rounded-lg w-full" />
            <input name="followers" value={form.followers} onChange={handleChange} placeholder="Followers" className="border p-3 rounded-lg w-full" />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-3 rounded-lg w-full" />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price (₹)" className="border p-3 rounded-lg w-full" />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-3 rounded-lg w-full" />
            <input name="youtube" value={form.youtube} onChange={handleChange} placeholder="YouTube Link" className="border p-3 rounded-lg w-full" />
            <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="Instagram Link" className="border p-3 rounded-lg w-full" />

            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" className="border p-3 rounded-lg w-full sm:col-span-2" />

            <button
              disabled={loading}
              className="bg-black text-white py-3 rounded-xl w-full sm:col-span-2 hover:bg-gray-800 transition"
            >
              {loading ? "Processing..." : editingId ? "Update Influencer" : "Add Influencer 🚀"}
            </button>

          </form>
        </div>

        {/* 👥 CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

          {/* 🔥 SHIMMER */}
          {pageLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow animate-pulse">
                <div className="w-full h-32 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
              </div>
            ))}

          {/* ✅ DATA */}
          {!pageLoading && data.map((inf) => (
            <div
              key={inf._id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition text-center"
            >
              <img
                src={inf.image || "https://via.placeholder.com/150"}
                className="w-full h-32 object-cover rounded mb-3"
              />

              <h3 className="font-semibold text-base sm:text-lg">{inf.name}</h3>

              <p className="text-sm text-gray-500">
                👥 {inf.followers}
              </p>

              <p className="text-sm font-semibold text-green-600">
                ₹{inf.price}
              </p>

              {/* 🔥 BUTTONS FIX */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">

                <button
                  onClick={() => handleEdit(inf)}
                  className="w-full sm:w-auto bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteInfluencer(inf._id)}
                  className="w-full sm:w-auto bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
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

export default Admin;