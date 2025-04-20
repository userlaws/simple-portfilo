"use client";

import { useState } from "react";
import Image from "next/image"; // Import Image from Next.js
import { SunIcon, MoonIcon, LinkIcon } from '@heroicons/react/24/solid'; // Import icons

export default function MainPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex flex-col justify-between min-h-screen font-sans ${isDarkMode ? 'bg-black text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <main className="flex justify-center items-center p-6">
        <div className="max-w-3xl w-full">
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="absolute top-4 right-4 p-2">
            {isDarkMode ? (
              <SunIcon className="h-6 w-6 text-yellow-500 opacity-70" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-800 opacity-70" />
            )}
          </button>

          {/* Profile Section */}
          <div className="text-center mb-8">
            <Image
              src="/profile.png" // Ensure this path is correct
              alt="Profile Icon"
              className="rounded-full mx-auto mb-4" 
              width={120}
              height={120}
              priority
            />
            <h1 className="text-3xl font-bold">Imanol Aracena</h1>
            <h2 className="text-xl font-semibold mt-2">Full Stack Developer</h2>
            <p className="mt-2 max-w-xl mx-auto">
              I love to code and build things. I want keep learning and keep building. I do build websites and apps for fun. I am a gamer so I started coding bots for discord and that was the start of my coding journey.
            </p>
          </div>
          
          {/* Skills Section */}
          {/* <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Skills</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 bg-gray-200 rounded-full">JavaScript</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full">React</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full">TypeScript</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full">Next.js</span>
              <span className="px-3 py-1 bg-gray-200 rounded-full">Tailwind CSS</span>
            </div>
          </div> */}
          
          {/* Projects Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Memorable Projects</h2>
            <div className="space-y-4">
              <div className="text-center">
                <a href="https://iaresume.org/" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline flex justify-center items-center">
                  <span>Personal Portfolio</span>
                  <LinkIcon className="ml-2 h-5 w-5" />
                </a>
                <p>This is my official portfolio site.</p>
              </div>
              <div className="text-center">
                <a href="https://spend-wise-vert.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline flex justify-center items-center">
                  <span>SpendWise</span>
                  <LinkIcon className="ml-2 h-5 w-5" />
                </a>
                <p className="break-words justify-center">SpendWise helps you track expenses, set budgets, and achieve your financial goals with intuitive tools and insightful analytics.</p>
              </div>
              <div className="text-center">
                <a href="https://github.com/userlaws/Discord-VC-Leaderboard" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline flex justify-center items-center">
                  <span>Discord VC Leaderboard</span>
                  <LinkIcon className="ml-2 h-5 w-5" />
                </a>
                <p>This is a Discord bot that tracks users' activity in voice channels, including total time spent, muted time, and deafened time. The bot posts and updates a leaderboard on a Discord channel using webhooks.</p>
              </div>
              <div className="text-center">
                <a href="https://noteshare.us" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:underline flex justify-center items-center">
                  <span>NoteShare</span>
                  <LinkIcon className="ml-2 h-5 w-5" />
                </a>
                <p>This is my project that I made for myself to learn. It's a website that allows you to share notes with your friends.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t border-gray-200">
        <div className="text-center">
          <p>© 2025 Imanol Aracena. All rights reserved.</p>
        </div>
      </footer>
    </div>
  ); 
}
