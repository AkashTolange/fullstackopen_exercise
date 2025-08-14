import { useState } from "react";

const BlogForm = ({ handleAddBlog }) => {
  const [newBlogTitle, setnewBlogTitle] = useState("");
  const [newBlogAuthor, setnewBlogAuthor] = useState("");
  const [newBlogUrl, setnewBlogUrl] = useState("");

  const newBlog = async (event) => {
    event.preventDefault();
    handleAddBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });
    setnewBlogTitle("");
    setnewBlogAuthor("");
    setnewBlogUrl("");
  };

  return (
    <div className="blogform">
      <h2>create new</h2>
      <form onSubmit={newBlog} id="form">
        <div>
          Title:
          <input
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setnewBlogTitle(target.value)}
            placeholder="title"
            id="title"
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setnewBlogAuthor(target.value)}
            placeholder="author"
            id="author"
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setnewBlogUrl(target.value)}
            placeholder="url"
            id="url"
          />
        </div>

        <button type="submit" id="submit">
          create
        </button>
      </form>
      <br />
    </div>
  );
};

export default BlogForm;

















































// import { useState } from 'react'

// const BlogForm = ({ createBlog }) => {
//   const [title, setTitle] = useState('')
//   const [author, setAuthor] = useState('')
//   const [url, setUrl] = useState('')

//   const addBlog = (event) => {
//     event.preventDefault()
//     createBlog({
//       title,
//       author,
//       url,
//     })
//     setTitle('')
//     setAuthor('')
//     setUrl('')
//   }

//   return (
//     <div>
//       <h3>Create new blog</h3>
//       <form onSubmit={addBlog}>
//         <div>
//           title:
//           <input
//             type="text"
//             value={title}
//             onChange={({ target }) => setTitle(target.value)}
//             required
//           />
//         </div>
//         <div>
//           author:
//           <input
//             type="text"
//             value={author}
//             onChange={({ target }) => setAuthor(target.value)}
//             required
//           />
//         </div>
//         <div>
//           url:
//           <input
//             type="url"
//             value={url}
//             onChange={({ target }) => setUrl(target.value)}
//             required
//           />
//         </div>
//         <button type="submit">create</button>
//       </form>
//     </div>
//   )
// }

// export default BlogForm
