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
import "./App.css";
import SearchAppBar from "./components/SearchAppBar";
import PostCard from "./components/PostCard";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
      <SearchAppBar
        openSidebar={() => setSidebarOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Drawer open={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
        <List disablePadding>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText>New post</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Container>
        <Grid container padding={5} spacing={3}>
          {posts
            .filter((post) => post.title.includes(searchQuery))
            .map((post) => (
              <PostCard post={post} />
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
