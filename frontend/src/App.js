import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Dashboard from "./components/DashBoard";
import DatasetView from "./pages/DatasetView";

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
        <Route
          path="/dataset/:id"
          element={
            <SignedIn>
              <DatasetView />
            </SignedIn>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
