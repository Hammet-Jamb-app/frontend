import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* Navbar */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-8">

        <h1 className="text-lg font-semibold">
          Hammet
        </h1>

        <div className="flex items-center gap-4">

          <Link
            href="/login"
            className="text-sm text-gray-700 hover:text-black"
          >
            Sign In
          </Link>

          <Link
            href="/register/tutor"
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>

        </div>

      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">

        <div className="text-center max-w-xl space-y-6">

          <h2 className="text-4xl font-bold tracking-tight">
            AI-Powered JAMB Tutorial Platform
          </h2>

          <p className="text-gray-600">
            Hammet helps tutors identify weak topics across their
            students and focus teaching where it matters most.
          </p>

          <div className="flex justify-center gap-4">

            <Link
              href="/register/tutor"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Start Teaching
            </Link>

            <Link
              href="/login"
              className="bg-white border px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Sign In
            </Link>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 pb-6">
        © {new Date().getFullYear()} Hammet Labs
      </footer>

    </div>
  )
}