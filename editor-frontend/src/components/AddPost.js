import {
  Container,
  Paper,
  Typography,
  TextField,
  Box,
  Switch,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

function AddPost() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setError(false);
  const submitPost = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts`,
        { title, content, published },
        {
          withCredentials: true,
        }
      )
      .then(() => navigate("/"))
      .catch(() => setError(true));
  };
  return (
    <div className="App">
      <Navigation
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        showSearchBar={false}
      />
      <Container>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Check your post details again!
          </Alert>
        </Snackbar>
        <Paper
          elevation={3}
          sx={{ maxWidth: 600, marginX: "auto", marginY: 5, padding: 3 }}
        >
          <form onSubmit={submitPost}>
            <Typography variant="h2" component="h1" gutterBottom>
              Add Post
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "flex-start",
                padding: 1,
              }}
            >
              <TextField
                type="text"
                name="title"
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                type="text"
                name="content"
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                multiline
                fullWidth
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">Publish Post:</Typography>
                <Switch
                  name="published"
                  value={published}
                  onChange={() => setPublished(!published)}
                />
              </Box>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default AddPost;
