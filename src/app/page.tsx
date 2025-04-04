'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);
  const [showCaseOptions, setShowCaseOptions] = useState(false);

  // Component mounted after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const startGame = (mode: string) => {
    router.push(`/game?mode=${mode}`);
  };

  // Don't render until client-side
  if (!mounted) {
    return null;
  }

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-48 fixed h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="flex flex-col h-full">
            <div className="p-4 flex justify-center">
              <Link href="/">
                <Image src="/img.png" alt="DetectAive Logo" width={80} height={80} className="cursor-pointer" />
              </Link>
            </div>
            
            <div className="p-4 flex-grow">
              <div className="mb-4 relative">
                <button 
                  onClick={() => setShowCaseOptions(!showCaseOptions)}
                  className={`w-full p-2 flex justify-between ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} rounded`}
                >
                  <span>New Case</span>
                  <span className="text-gray-500 text-sm">0/3</span>
                </button>
                <div 
                  id="case-options"
                  className={`mt-2 transition-all duration-200 ${showCaseOptions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'} ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded overflow-hidden shadow-lg z-10`}
                >
                  <button 
                    onClick={() => startGame('quick')} 
                    className="w-full p-2 text-left hover:bg-gray-600 transition-colors"
                  >
                    Quick Case
                  </button>
                  <button 
                    onClick={() => startGame('standard')} 
                    className="w-full p-2 text-left hover:bg-gray-600 transition-colors"
                  >
                    Standard Case
                  </button>
                  <button 
                    onClick={() => startGame('complex')} 
                    className="w-full p-2 text-left hover:bg-gray-600 transition-colors"
                  >
                    Complex Case
                  </button>
                </div>
              </div>
            </div>
            
            <div className={`p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
              <div className="flex flex-col gap-4">
                <Link href="/admin" className={`w-full p-2 text-center ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-400 text-gray-800'} rounded`}>
                  Admin
                </Link>
                <div className="flex justify-end">
                  <button onClick={toggleTheme} className="text-xl">
                    {theme === 'dark' ? '🌙' : '☀️'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="ml-48 flex-grow p-8">
          <div className="max-w-4xl mx-auto text-center">
            <Image src="/img.png" alt="DetectAive Logo" width={200} height={200} className="mx-auto" />
            <p className="my-6 text-lg">
              Play as a detective solving procedurally generated murder mysteries. Examine evidence, interrogate suspects, and solve cases.
            </p>
            
            <div className="grid grid-cols-3 gap-6 my-8">
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} cursor-pointer hover:shadow-lg transition`} onClick={() => startGame('quick')}>
                <h3 className="text-xl font-bold mb-2">Quick Case</h3>
                <p>5-8m | Quick Investigation</p>
              </div>
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} cursor-pointer hover:shadow-lg transition`} onClick={() => startGame('standard')}>
                <h3 className="text-xl font-bold mb-2">Standard Case</h3>
                <p>10-15m | Detailed Investigation</p>
              </div>
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} cursor-pointer hover:shadow-lg transition`} onClick={() => startGame('complex')}>
                <h3 className="text-xl font-bold mb-2">Complex Case</h3>
                <p>20m+ | Complex Investigation</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mt-12 mb-4">How to Play</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><strong>1. Select a Case Difficulty:</strong> Choose from Quick, Standard, or Complex based on your experience.</p>
                <p className="mb-2"><strong>2. Examine the Crime Scene:</strong> Review the initial evidence and circumstances.</p>
                <p className="mb-2"><strong>3. Interrogate Suspects:</strong> Question each suspect to find inconsistencies.</p>
              </div>
              <div>
                <p className="mb-2"><strong>4. Investigate Evidence:</strong> Examine each piece of evidence for clues.</p>
                <p className="mb-2"><strong>5. Make an Arrest:</strong> When confident, make an arrest and solve the case.</p>
                <p className="mb-2"><strong>6. Case Resolution:</strong> Learn if you arrested the right suspect.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className={`fixed bottom-0 w-full p-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="flex justify-between items-center">
          <span>@Parasmani Skill Pvt</span>
        </div>
      </footer>
    </main>
  );
}
