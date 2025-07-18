import React from "react";
import { FiCpu, FiTrendingUp, FiUsers } from "react-icons/fi";
import { IconType } from "react-icons";

type Feature = {
  title: string;
  desc: string;
  icon: IconType;
};

const features: Feature[] = [
  {
    title: "AI-Powered Feedback",
    desc: "Get instant analysis and score for your startup idea.",
    icon: FiCpu,
  },
  {
    title: "Validation Metrics",
    desc: "Market fit, uniqueness, scalability, and more.",
    icon: FiTrendingUp,
  },
  {
    title: "Share & Collaborate",
    desc: "Send your pitch link to mentors or teammates.",
    icon: FiUsers,
  },
];

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="py-24  px-6 md:px-20 text-center text-white"
    >
      <h2 className="text-5xl font-extrabold mb-16 tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">Features</h2>
      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {features.map(({ title, desc, icon: Icon }) => (
          <div
            key={title}
            className="group relative rounded-3xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 p-[2px] shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-[1.05]"
          >
            <div
              className="flex flex-col items-center justify-center rounded-3xl bg-[#18181b] px-8 py-10 space-y-6 group-hover:bg-gradient-to-br group-hover:from-[#18181b] group-hover:via-[#232526] group-hover:to-[#232526] transition-colors duration-300 h-full"
            >
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 group-hover:bg-pink-500 transition-colors duration-300"
              >
                <Icon className="text-4xl text-white group-hover:text-white/90 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white group-hover:text-pink-400 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed max-w-sm">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
