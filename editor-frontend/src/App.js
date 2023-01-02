import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPost from "./components/AddPost";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/new" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
