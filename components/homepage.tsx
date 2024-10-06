// index.tsx (for the homepage at /)
import Link from "next/link";

export function Homepage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Boring Fun Tools Collection</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl px-4">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">iOS Calculator</h3>
            <p className="text-gray-500 mb-6">
              A fully functional iOS-like calculator built for the web.
            </p>
            <Link href="/calculator" className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors">
              Try Calculator
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 w-full text-center">
        <p className="text-sm">Made with ❤️ for fun</p>
      </footer>
    </div>
  );
}
