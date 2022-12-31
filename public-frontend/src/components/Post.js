import { DateTime } from "luxon";
import Comment from "./Comment";

function Post({ post }) {
  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p className="date">
        {DateTime.fromISO(post.timestamp).toLocaleString(DateTime.DATETIME_MED)}
      </p>
      <p>{post.content}</p>
      <div className="container">
        {post.comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default Post;
