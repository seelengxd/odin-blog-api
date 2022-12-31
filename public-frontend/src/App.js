import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`)
      .then((response) => {
        setPosts(response.data.posts);
      });
  }, []);
  return (
    <div className="App">
      <header>
        <h1>Blog</h1>
      </header>
      <div className="container">
        {posts.map((post) => (
          <p>{post.title}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
