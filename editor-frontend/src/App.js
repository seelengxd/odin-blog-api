import { Container, Grid } from "@mui/material";
import "./App.css";
import SearchAppBar from "./components/SearchAppBar";
import PostCard from "./components/PostCard";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const loadPosts = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`)
      .then((response) => {
        setPosts(response.data.posts);
      });
  };
  useEffect(loadPosts, []);
  return (
    <div className="App">
      <SearchAppBar />
      <Container>
        <Grid container padding={5} spacing={3}>
          {posts.map((post) => (
            <PostCard post={post} />
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
