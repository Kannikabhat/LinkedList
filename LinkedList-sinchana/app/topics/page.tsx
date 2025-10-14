"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Define TypeScript type
type Topic = {
  name: string;
  path: string;
  unlocked: boolean;
};

// Initial topic list
const initialTopics: Topic[] = [
  
  { name: "Linked Lists", path: "/linkedlist", unlocked: true },
  { name: "Hashing", path: "/hashing", unlocked: true },

];

const TopicsPage = () => {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>(initialTopics);

  // Load unlocked topics from localStorage on mount
  useEffect(() => {
    const savedTopics = localStorage.getItem("unlockedTopics");
    if (savedTopics) {
      try {
        const parsedTopics = JSON.parse(savedTopics);
        if (Array.isArray(parsedTopics)) {
          setTopics(parsedTopics);
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  // Save unlocked topics to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("unlockedTopics", JSON.stringify(topics));
  }, [topics]);

  // Handle topic selection
  const handleTopicClick = (index: number) => {
    if (!topics[index].unlocked) {
      console.log(`🔒 Topic ${topics[index].name} is locked!`);
      return;
    }

    console.log(`✅ Navigating to: ${topics[index].path}`);
    router.push(topics[index].path); // Navigate to topic page

    // Unlock the next topic if it exists
    if (index + 1 < topics.length && !topics[index + 1].unlocked) {
      setTopics((prevTopics) =>
        prevTopics.map((topic, i) =>
          i === index + 1 ? { ...topic, unlocked: true } : topic
        )
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <motion.h1 className="text-4xl font-bold mb-8">Choose a Topic</motion.h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics.map((topic, index) => (
          <motion.button
            key={topic.path}
            className={`relative flex items-center justify-center p-5 w-48 h-24 rounded-lg text-lg font-semibold transition-all shadow-lg ${
              topic.unlocked
                ? "bg-blue-500 hover:scale-105 hover:shadow-xl"
                : "bg-gray-700 opacity-50 cursor-not-allowed"
            }`}
            onClick={() => handleTopicClick(index)}
            whileHover={topic.unlocked ? { scale: 1.1 } : {}}
          >
            {topic.name} {!topic.unlocked && "🔒"}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;