import React, { useState } from "react";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const onAddComment = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comment`, {
      method: "post",
      body: JSON.stringify({ username, text: commentText }),
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const body = await result.json();
    setArticleInfo(body);
    setUsername("");
    setCommentText("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name:
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        Comment
        <textarea
          rows={4}
          cols={50}
          value={commentText}
          onChange={({ target }) => setCommentText(target.value)}
        />
      </label>
      <button onClick={() => onAddComment()}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
