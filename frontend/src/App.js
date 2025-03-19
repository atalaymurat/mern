import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import { AuthProvider } from "./context/Auth";

import Home from "./pages/Home"
import Docs from "./pages/docs/Index"
import DocNew from "./pages/docs/New"

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="/doc" element={<Docs />} />
          <Route exact path="/doc/new" element={<DocNew />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
