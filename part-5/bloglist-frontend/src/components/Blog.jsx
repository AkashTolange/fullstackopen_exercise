// const Blog = ({ blog }) => (
//   <div>
//     {blog.title} by  {blog.author}
//   </div>  
// )

// export default Blog

import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, loggedInUser, handleLikes }) => {
  const [showDetails, setShowDetails] = useState("");

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  blogStyle.removebutton = {
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
    border: "solid",
  };

  const togglAble = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = async (blog) => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirmation) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs((blogs) => blogs.filter((item) => item.id !== blog.id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div style={blogStyle} className="blog-div">
      <div>
        {blog.title}
        <div>{blog.author}</div>

        <button onClick={togglAble} id="view">
          {showDetails ? "Hide" : "View"}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}{" "}
            <button onClick={() => handleLikes(blog)} id="like-button">
              Like
            </button>
          </div>

          {blog.user.name}
          {console.log(loggedInUser, "loggedInUser")}
          {console.log(blog, "blog")}
          <div>
            {loggedInUser.id === blog.user ||
            loggedInUser.id === blog.user.id ? (
              <button
                onClick={() => handleDelete(blog)}
                style={blogStyle.removebutton}
                id="remove"
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
