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
import { useState } from "react";
import Navigation from "./Navigation";

function PostForm({ formTitle, post, handleSubmit }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : " ");
  const [published, setPublished] = useState(post ? post.published : false);
  console.log(published);
  const [error, setError] = useState(false);
  const handleClose = () => setError(false);
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(setError, { title, content, published });
            }}
          >
            <Typography variant="h2" component="h1" gutterBottom>
              {formTitle}
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
                  defaultChecked={published}
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

export default PostForm;
