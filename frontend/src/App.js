import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Dashboard from "./components/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <>
              <SignedOut>
                <Home />
              </SignedOut>

              <SignedIn>
                <Dashboard />
              </SignedIn>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
