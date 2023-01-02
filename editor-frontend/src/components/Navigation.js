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
import SearchAppBar from "./SearchAppBar";

function Navigation({
  searchQuery,
  setSearchQuery,
  isSidebarOpen,
  setSidebarOpen,
  showSearchBar,
}) {
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
            <ListItemButton>
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
