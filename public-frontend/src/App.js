import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Post from "./components/Post";

function App() {
  const [posts, setPosts] = useState([]);
  const loadPosts = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/posts?published=true`)
      .then((response) => {
        setPosts(response.data.posts);
      });
  };
  const submitNewComment = (id) => (commentData) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}/comments`,
        commentData
      )
      .then(() => loadPosts());
  };
  useEffect(loadPosts, []);
  return (
    <div className="App">
      <header>
        <h1>Blog</h1>
      </header>
      <div className="container">
        {posts.map((post) => (
          <Post
            post={post}
            key={post._id}
            submitNewComment={submitNewComment(post._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
