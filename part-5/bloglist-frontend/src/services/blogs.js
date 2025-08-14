import axios from 'axios'
// const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost: 3005/api/blogs';

let token = null;


const setToken = (newToken) => {
  // token = `bearer ${newToken}`
  const userToken = JSON.parse(window.localStorage.getItem("user"));
  token = `Bearer ${userToken.token}`;
  return token;
}

const getAll = async(blogs) => {
  const request = await axios.get(baseUrl, blogs);
  return response.data;
}


const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async(id, blogToUpdate) =>{
  const myToken = setToken();
  const config ={
    headers: { Authorization: myToken },
  };
  try{ 
    const response = await axios.put(`${baseUrl}/${id}`, blogToUpdate, config);
    //look
    console.log(response.data, "from update service");
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
  }
}

const deleteBlog = async(id) =>{
  const myToken = setToken();
  const config = {
    headers: { Authorization: myToken},
  };
  try{ 
    const response = await axios.delete( `${baseUrl}/${id}`, config);
  } catch (error) {
    console.error("error deleting blog", error);
  }
};

export default { getAll, create, setToken, update, deleteBlog};