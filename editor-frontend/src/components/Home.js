import {
  Container,
  Grid,
  ListItem,
  ListItemText,
  Drawer,
  List,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import "../App.css";
import SearchAppBar from "./SearchAppBar";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);
  const loadPosts = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`, {
        withCredentials: true,
      })
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setLoggedIn(false);
        } else {
          console.error(err);
        }
      });
  };
  const togglePublishPost = (post) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/${post._id}`,
        {
          published: !post.published,
        },
        { withCredentials: true }
      )
      .then(() => loadPosts())
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setLoggedIn(false);
        } else {
          console.error(err);
        }
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`, {
        withCredentials: true,
      })
      .then(() => loadPosts())
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setLoggedIn(false);
        } else {
          console.error(err);
        }
      });
  };
  useEffect(loadPosts, []);
  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn]);
  return (
    <div className="App">
      <Navigation
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearchBar={true}
      />
      <Container>
        <Grid container padding={5} spacing={3}>
          {posts
            .filter((post) => post.title.includes(searchQuery))
            .map((post) => (
              <PostCard
                post={post}
                togglePublishPost={() => togglePublishPost(post)}
                deletePost={() => deletePost(post._id)}
              />
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
