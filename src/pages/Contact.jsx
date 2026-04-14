import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    budget: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/leads`,
        form
      );

      toast.success("Request sent successfully 🚀");

      setForm({
        name: "",
        email: "",
        budget: "",
        message: ""
      });

    } catch (err) {
      toast.error("Failed to send request ❌");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 pt-28 pb-10">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Brand Inquiry 📩
        </h2>

        <input
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
          required
        />

        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
          required
        />

        <input
          name="budget"
          value={form.budget}
          placeholder="Budget"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          name="message"
          value={form.message}
          placeholder="Campaign details"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Contact;