'use client';

import { useState } from "react";
import Link from "next/link";
import { Calculator, Clock, Cloud } from 'lucide-react'; // Import icons

const toolsData = [
  {
    title: "Calculator",
    description: "A fully functional iOS-like calculator built for the web.",
    link: "/calculator",
    icon: Calculator,
  },
  {
    title: "Clock",
    description: "A simple and intuitive world clock application.",
    link: "/clock",
    icon: Clock,
  },
  {
    title: "Weather",
    description: "A weather app that displays weather information.",
    link: "/weather",
    icon: Cloud,
  },
];

export function Homepage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tools based on search term
  const filteredTools = toolsData.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full max-w-md mx-auto px-4 mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for tools..."
            value={searchTerm}
            onChange={(evt) => setSearchTerm(evt.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md pr-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl px-4">
        {filteredTools.map((tool) => (
          <div key={tool.title} className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform duration-200 transform hover:scale-105 hover:outline hover:outline-yellow-500 hover:outline-2 hover:outline-offset-2">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex gap-3 items-center justify-center"><tool.icon className="h-6 w-6 text-yellow-500" /> {tool.title}</h3>
            <p className="text-gray-500 mb-6">{tool.description}</p>
            <Link href={tool.link} className="inline-block py-2 px-6 rounded-full transition-colors bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 transition duration-200 ease-in-out">
              Try {tool.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
