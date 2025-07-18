'use client';

import Features from '@/components/comp/Features';
import Footer from '@/components/comp/footer';
import Hero from '@/components/comp/Hero';
import Pricing from '@/components/comp/Pricing';
import React from 'react'

const HowItWorks = () => (
  <section className="py-20 px-6 w-[100%] md:px-20 bg-[#0f0f0f]  text-white text-center">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">How It Works</h2>
    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center mb-4 text-3xl font-bold">1</div>
        <h3 className="text-xl font-semibold mb-2">Describe Your Idea</h3>
        <p className="text-gray-300">Enter your startup idea in our AI-powered assistant. No technical jargon needed!</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center mb-4 text-3xl font-bold">2</div>
        <h3 className="text-xl font-semibold mb-2">Get Instant Feedback</h3>
        <p className="text-gray-300">Our AI analyzes your idea and provides actionable feedback and a validation score in seconds.</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center mb-4 text-3xl font-bold">3</div>
        <h3 className="text-xl font-semibold mb-2">Refine & Share</h3>
        <p className="text-gray-300">Improve your pitch, share with mentors or teammates, and get ready to launch with confidence.</p>
      </div>
    </div>
  </section>
);

const page = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#18181b] via-[#232526] to-[#414345] flex flex-col items-center">
      <div className="w-full  flex flex-col gap-0">
        <Hero/>
        <Features/>
        <HowItWorks/>
        <Pricing/>
      </div>
      <Footer/>
    </div>
  )
}

export default page