import { DateTime } from "luxon";
import Comment from "./Comment";
import plus from "../static/images/plus.svg";
import { useState } from "react";
import CommentForm from "./CommentForm";

function Post({ post, submitNewComment }) {
  const [formActivated, setFormActivated] = useState(false);
  const deactivateForm = () => setFormActivated(false);

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p className="date">
        {DateTime.fromISO(post.timestamp).toLocaleString(DateTime.DATETIME_MED)}
      </p>
      <p>{post.content}</p>
      <div className="container">
        {post.comments.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </div>
      {formActivated ? (
        <CommentForm
          deactivateForm={deactivateForm}
          submitNewComment={submitNewComment}
        />
      ) : (
        <button onClick={() => setFormActivated(true)}>
          <img src={plus} alt="plus" />
          New Comment
        </button>
      )}
    </div>
  );
}

export default Post;
