import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "./PostForm";

function EditPost() {
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${params.id}`, {
        withCredentials: true,
      })
      .then((response) => setPost(response.data.post))
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/login");
        } else {
          alert("Your url doesn't seem right.");
          navigate("/");
        }
      });
  }, []);

  const updatePost = (setError, { title, content, published }) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts/${post._id}`,
        { title, content, published },
        {
          withCredentials: true,
        }
      )
      .then(() => navigate("/"))
      .catch(() => setError(true));
  };
  return post ? (
    <PostForm formTitle={"Edit Post"} handleSubmit={updatePost} post={post} />
  ) : (
    <CircularProgress />
  );
}

export default EditPost;
