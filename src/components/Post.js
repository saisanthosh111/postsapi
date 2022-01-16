import React from "react";
import "./Post.css";
const Post = ({ post: { title, body, userId }, index }) => {
return (
    
	<div className="post-container">
	<strong className="heading">{title}
	<span class="written"> user {userId}</span>
	</strong>
		<div class="textarea">{body}</div>
	</div>
	
);
};

export default Post;
