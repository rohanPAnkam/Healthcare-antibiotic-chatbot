"use client";
import type React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen">
      <Navbar />
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?t=st=1740811759~exp=1740815359~hmac=d587e951c6410f56f1d15105b9db2bf4836ba397ffbed3ed6e645c5e769f1e39&w=2000"
          layout="fill"
          objectFit="cover"
          alt="Antibiotics Information"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">
        <motion.h1
          className="text-5xl md:text-7xl drop-shadow-[2px_2px_0px_black] font-bold text-blue-900 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          VITACHAT
        </motion.h1>
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Your Antibiotic Info Assistant
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Get instant, accurate information on antibiotic usage, resistance, and
          benefits with our AI-powered chatbot.
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="/chatpage">
            <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition duration-300">
              Start Chatting
            </span>
          </Link>
        </motion.div>
        {/* Feature Highlights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold">Instant Answers</h3>
            <p className="text-sm">
              Get quick responses to your antibiotic queries.
            </p>
          </motion.div>
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold">Expert Knowledge</h3>
            <p className="text-sm">Powered by AI trained on medical data.</p>
          </motion.div>
          <motion.div
            className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold">24/7 Access</h3>
            <p className="text-sm">Chat anytime, anywhere.</p>
          </motion.div>
        </div>
      </div>

      {/* Info Sections */}
      <section className="relative z-10 bg-white text-gray-900 py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Antibiotics Matter
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Antibiotics save lives by fighting bacterial infections, but misuse
            leads to resistance. Stay informed to use them effectively.
          </motion.p>
        </div>
      </section>

      <section className="relative z-10 bg-gray-100 text-gray-900 py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            How Our Chatbot Helps
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our chatbot provides real-time guidance on antibiotic use, side
            effects, and alternatives. Get answers instantly and make informed
            decisions.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
