import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";

function AddPost() {
  const navigate = useNavigate();
  const submitPost = (setError, { title, content, published }) => {
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
  return <PostForm formTitle={"Add Post"} handleSubmit={submitPost} />;
}

export default AddPost;
