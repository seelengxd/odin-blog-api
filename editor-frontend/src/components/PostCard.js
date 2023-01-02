import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { Typography, Paper, Box, Button, Grid } from "@mui/material";
import { DateTime } from "luxon";

function PostCard({ post, togglePublishPost }) {
  return (
    <Grid item sm={12} md={6} padding={5}>
      <Paper sx={{ padding: 3 }} elevation={3}>
        <Typography variant="h3" component="h2">
          {post.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {DateTime.fromISO(post.timestamp).toLocaleString(DateTime.DATE_MED)}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          {post.content}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {post.published ? (
            <Button
              variant="contained"
              color="primary"
              onClick={togglePublishPost}
            >
              <UnpublishedIcon sx={{ mr: 0.5 }} />
              Unpublish
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={togglePublishPost}
            >
              <PublishIcon sx={{ mr: 0.5 }} />
              Publish
            </Button>
          )}
          <Button variant="contained" color="success">
            <EditIcon sx={{ mr: 0.5 }} />
            Edit
          </Button>
          <Button variant="contained" color="error">
            <DeleteIcon sx={{ mr: 0.5 }} />
            Delete
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default PostCard;
