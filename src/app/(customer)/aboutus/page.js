"use client";

export default function AboutUs() {
  const features = [
    {
      title: "Explore Menus",
      desc: "Browse canteen meals, specials, and favorites in seconds.",
      icon: "🍽️",
    },
    {
      title: "Place Orders",
      desc: "Order anytime and skip the wait—quick and easy!",
      icon: "🛒",
    },
    {
      title: "Fast Delivery",
      desc: "Get your food delivered hot, fresh, and fast on campus.",
      icon: "🚀",
    },
    {
      title: "Easy Payments",
      desc: "Smooth payments with cash or KBZ Pay.",
      icon: "💳",
    },
  ];

  const images = ["eating.jpg", "restaurant.png", "canteens.jpg", "deli.jpg"];

  return (
    <div className="bg-[#FFF8E7] min-h-screen py-12 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-950 tracking-wide">
            About Us
          </h2>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
            Making your campus food experience easier, faster, and tastier.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          {/* Image Column */}
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={`/images/${img}`}
                alt={`canteen-${i}`}
                className="rounded-2xl shadow-md w-full h-50 object-cover transition-transform hover:scale-105 duration-300"
              />
            ))}
          </div>

          {/* Text + Features */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-semibold text-red-700">
              Why Choose Us
            </h3>
            <p className="text-gray-700 text-base sm:text-lg">
              Our student canteen platform simplifies your day: discover meals,
              place orders online, and enjoy fast, cashless service with ease.
              Built with care to help you eat well and live smart on campus.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white shadow hover:shadow-xl p-5 flex items-start gap-4 transition-transform hover:scale-[1.02]"
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-600">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-15 bg-gray-800 text-white rounded-3xl px-6 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Meet Our Team */}
            <div>
              <h3 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-2 mt-1">
                👥 ROKU FORCE TEAM
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-lg font-bold">
                    <img
                      src="/images/founder.jpeg"
                      alt="Kaung Nyein Kyaw"
                      className="w-12 h-12 rounded-full object-cover shadow"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Kaung Nyein Kyaw</p>
                    <p className="text-sm text-gray-300">Founder & CEO</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center text-lg font-bold">
                    <img
                      src="/images/Developer.jpeg"
                      alt="Tun Kraway Soe"
                      className="w-12 h-12 rounded-full object-cover shadow"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Tun Kraway Soe</p>
                    <p className="text-sm text-gray-300">Lead Developer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-2">
                📬 Contact Us
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="text-xl">📞</div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>09-882282855</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-xl">📧</div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>kaungnyeinkyaw000@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-xl">📍</div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p>Building 4, MICT Park</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom Text */}
          <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
            © {new Date().getFullYear()} Canteen Connect. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
