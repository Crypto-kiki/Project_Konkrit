import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import { useState } from "react";
import Launchpad from "./pages/launchpad";
import Collection from "./pages/collection";

function App() {
  const [account, setAccount] = useState("");

  return (
    <BrowserRouter>
      <div className="bg-[#18181B] min-h-screen min-w-[1250px]">
        <Routes>
          <Route
            path="/"
            element={<Main account={account} setAccount={setAccount} />}
          />
          <Route
            path="/Launchpad"
            element={<Launchpad account={account} setAccount={setAccount} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
