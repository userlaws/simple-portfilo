"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function HelloPage() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLandingPage(false);
      router.push('/main');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={`flex flex-col justify-center items-center h-screen font-sans bg-gray-100 text-gray-900 transition-opacity duration-500 ${showLandingPage ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`text-center transition-opacity duration-500 ${showLandingPage ? 'opacity-100' : 'opacity-0'} flex flex-col items-center`}>
        <Image
          src="/profile.png"
          alt="Profile Icon"
          width={64}
          height={64}
          className="rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">Hello, I'm Imanol Aracena!</h1>
        <p className="text-lg">Welcome to my website.</p>
      </div>
    </div>
  );
}
