import { useState } from "react";

function CommentForm({ deactivateForm, submitNewComment }) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    submitNewComment({ message, name });
  };
  return (
    <div className="comment">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          name="name"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button> Submit </button>
        <button className="delete" onClick={deactivateForm}>
          X
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
