import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Dashboard from "./components/DashBoard";
import DatasetView from "./pages/DatasetView";
import Compare from "./pages/Compare";

function App() {
  // const [compareList] = useState([]);

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
        <Route
          path="/dataset/:id"
          element={
            <SignedIn>
              <DatasetView />
            </SignedIn>
          }
        />
        <Route
          path="/compare"
          element={
            <SignedIn>
              <Compare />
            </SignedIn>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
