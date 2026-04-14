import { FaWhatsapp, FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-black text-white mt-16">

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* 🔥 About */}
        <div>
          <h2 className="text-xl font-semibold mb-4">InfluencerHub 🚀</h2>
          <p className="text-gray-400 text-sm">
            We connect brands with top influencers to create powerful
            collaborations and grow businesses digitally.
          </p>
        </div>

        {/* 📞 Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact</h2>

          <div className="space-y-3 text-gray-400 text-sm">

            <a
              href="mailto:upsetmediamarketing@gmail.com"
              className="flex items-center gap-2 hover:text-white transition cursor-pointer"
            >
              <FaEnvelope /> upsetmediamarketing@gmail.com
            </a>

            <a
              href="https://wa.me/+919644160105"
              target="_blank"
              className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>

          </div>
        </div>

        {/* 🌐 Social */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>

          <div className="flex gap-4 text-xl">

            <a
              href="#"
              className="hover:text-pink-500 transition cursor-pointer"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="hover:text-red-500 transition cursor-pointer"
            >
              <FaYoutube />
            </a>

          </div>
        </div>

      </div>

      {/* 🔻 Bottom */}
      <div className="text-center text-gray-500 text-sm border-t border-gray-800 py-4">
        © {new Date().getFullYear()} InfluencerHub. All rights reserved.
      </div>

    </div>
  );
}

export default Footer;