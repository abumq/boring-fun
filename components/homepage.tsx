import Link from "next/link";

export function Homepage() {
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

      <main className="flex-grow flex flex-col items-center justify-center gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-5xl px-4">
          {/* Tool Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Calculator</h3>
            <p className="text-gray-500 mb-6">
              A fully functional iOS-like calculator built for the web.
            </p>
            <Link href="/calculator" className="inline-block py-2 px-6 rounded-full transition-colors bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 transition duration-200 ease-in-out">
              Try Calculator
            </Link>
          </div>
          {/* Tool Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition-shadow transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Weather</h3>
            <p className="text-gray-500 mb-6">
              A weather app that displays weather information.
            </p>
            <Link href="/weather" className="inline-block py-2 px-6 rounded-full transition-colors bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 transition duration-200 ease-in-out">
              Try Weather
            </Link>
          </div>
          {/* Add more tools here as needed */}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 w-full text-center">
        <p className="text-sm">
          Made with ❤️ for fun
        </p>
      </footer>
    </div>
  );
}
