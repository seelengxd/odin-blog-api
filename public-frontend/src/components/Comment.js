function Comment({ comment }) {
  return (
    <div className="comment">
      <p>{comment.message}</p>
      <p>- {comment.name}</p>
    </div>
  );
}

export default Comment;
