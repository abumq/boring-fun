'use client';

import Link from "next/link";

export function Template({ children }: React.PropsWithChildren) {
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-white shadow w-full">
        <Link href="/" className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <img src="/useless-tools.png" alt="Useless Tools" className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 text-center">Useless Tools</h1>
            <p className="text-lg text-gray-600 text-center">Most useless tools on the planet</p>
          </div>
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center gap-10 pb-10">
        {children}
      </main>

      <footer className="bg-black text-white py-4 w-full text-center">
        <p className="text-sm">Made with ❤️ for fun</p>
      </footer>
    </div>
  );
}
