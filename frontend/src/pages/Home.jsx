import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">

    
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">
          ChemEquip Visualizer
        </h1>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-5 py-2 bg-white text-indigo-600 rounded-lg font-medium">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </nav>

    
      <section className="flex flex-col items-center text-center mt-24 px-6">
        <h2 className="text-5xl font-extrabold mb-6">
          Visualize & Analyze Chemical Equipment Data
        </h2>

        <p className="text-lg max-w-2xl text-indigo-100 mb-8">
          Upload CSV datasets, analyze operational parameters, track history,
          and detect abnormal conditions — all in one powerful dashboard.
        </p>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold text-lg">
              Get Started
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <a
            href="/dashboard"
            className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold text-lg"
          >
            Go to Dashboard
          </a>
        </SignedIn>
      </section>

      
      <section className="mt-32 px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            title: "CSV & Excel Upload",
            desc: "Upload chemical equipment datasets securely and instantly."
          },
          {
            title: "Smart Analytics & Alerts",
            desc: "Automatic averages, distributions, and threshold alerts."
          },
          {
            title: "History & Visualization",
            desc: "View, compare, and manage previously uploaded datasets."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-indigo-100">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      <footer className="mt-32 text-center text-indigo-200 pb-6">
        © 2026 Chemical Equipment Parameter Visualizer
      </footer>
    </div>
  );
}

export default Home;
