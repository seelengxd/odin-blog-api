import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setError(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then(() => navigate("/"))
      .catch(() => setError(true));
  };
  return (
    <Container>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Check your login credentials again!
        </Alert>
      </Snackbar>
      <Paper
        elevation={3}
        sx={{ maxWidth: 600, marginX: "auto", marginY: 5, padding: 3 }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h2" component="h1">
            Dashboard
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              type="text"
              name="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
