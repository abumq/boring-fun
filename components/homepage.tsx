'use client';

import { useState } from "react";
import Link from "next/link";
import { Calculator, Cloud } from 'lucide-react'; // Import icons

const toolsData = [
  {
    title: "Calculator",
    description: "A fully functional iOS-like calculator built for the web.",
    link: "/calculator",
    icon: Calculator,
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <img src="/useless-tools.png" alt="Useless Tools" className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 text-center">Useless Tools</h1>
            <p className="text-lg text-gray-600 text-center">Most useless tools on the planet</p>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center gap-10 pb-10">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
      </main>

      <footer className="bg-gray-800 text-white py-4 w-full text-center">
        <p className="text-sm">Made with ❤️ for fun</p>
      </footer>
    </div>
  );
}
