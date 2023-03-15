import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Landing } from "./layouts/Landing";
import { Home } from "./pages/Home";
import Worksapce from "./pages/Workspace";

import { store } from "./store/store";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<Home />} />
          <Route path="workspace" element={<Worksapce store={store} />} />
          <Route
            path="workspace/document/:docId"
            element={<Worksapce store={store} />}
          />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
