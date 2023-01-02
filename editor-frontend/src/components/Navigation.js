import { Home } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "./SearchAppBar";
import axios from "axios";

function Navigation({
  searchQuery,
  setSearchQuery,
  isSidebarOpen,
  setSidebarOpen,
  showSearchBar,
}) {
  const navigate = useNavigate();
  const logout = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users//logout`)
      .then(() => navigate("/login"));
  };
  return (
    <>
      <SearchAppBar
        openSidebar={() => setSidebarOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSearchBar={showSearchBar}
      />
      <Drawer open={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
        <List disablePadding>
          <ListItem>
            <ListItemButton href="/">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton href="/posts/new">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText>New post</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Navigation;
