'use client';

import Image from "next/image";
import Link from "next/link";

export function Template({ children }: React.PropsWithChildren) {
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="flex bg-white shadow w-full items-center justify-between">
        <Link href="/" className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <Image width={100} height={100} src="/useless-tools.png" alt="Useless Tools" className="mr-4" />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 text-center">Useless Tools</h1>
            <p className="text-lg text-gray-600 text-center">Most useless tools on the planet</p>
          </div>
        </Link>
        <a
          className="flex ml-auto hover:opacity-70"
          href="https://github.com/abumq/useless-tools"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image width={40} height={40} src="/github.png" alt="Github" className="mr-5" />
        </a>
      </header>


      <main className="flex-grow flex flex-col items-center justify-center gap-10 pb-10">
        {children}
      </main>

      <footer className="bg-black text-white py-4 w-full text-center">
        <p className="flex gap-4 flex-col justify-center items-center text-sm text-gray-300">
          <p className="text-sm">Made with ❤️ for 🎉</p>
          <div className="flex flex-row gap-3">
            <a href="https://buymeacoffee.com/useless_tools" target="_blank" rel="noopener noreferrer">
              <Image width={160} height={48} src="/coffee.png" alt="Buy Me Coffee" />
            </a>
            <a href="https://buy.stripe.com/00gbIY7je2qw5Py8wy" target="_blank" rel="noopener noreferrer">
              <Image width={80} height={30} src="/donate.png" alt="Donate via Stripe" />
            </a>
          </div>
        </p>
      </footer>
    </div>
  );
}
