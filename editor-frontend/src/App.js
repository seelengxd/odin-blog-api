import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts/new" element={<AddPost />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
