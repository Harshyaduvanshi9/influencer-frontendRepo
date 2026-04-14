import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const cleanedForm = {
        username: form.username.trim(),
        password: form.password.trim()
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        cleanedForm
      );

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful 🎉");

      navigate("/dashboard");

    } catch (err) {
      toast.error("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Admin Login 🔐
        </h2>

        <input
          name="username"
          value={form.username}
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
          required
        />

        <input
          name="password"
          type="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;