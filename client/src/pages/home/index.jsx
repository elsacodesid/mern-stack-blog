import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import {useNavigate} from "react-router-dom"


export default function Home() {
  const { formData, setFormData, blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
    const navigate = useNavigate();

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs");
    const result = await response.data;
    console.log(result);
    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    }else{
      setPending(false)
      setBlogList([])
    }
  }
  async function handleDelete(getCurrentId) {
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;
    if (result?.message) {
      fetchListOfBlogs();
    }
  }
  function handleEdit(getCurrentPost){
console.log(getCurrentPost)
navigate("/add-blog", {state: {getCurrentPost}})
  }
  useEffect(() => {
    fetchListOfBlogs();
  }, []);
  return (
    <div className={classes.wrapper}>
      <h1>Blog Entries</h1>
      {pending ? (
        <h1>Loading, please wait...</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? blogList.map((blogPost) => (
            <div key={blogPost._id}>
              <p>{blogPost.title}</p>
              <p>{blogPost.description}</p>
              <FaEdit onClick={()=>handleEdit(blogPost)} size={20} />
              <FaTrash onClick={() => handleDelete(blogPost._id)} size={20} />
            </div>
          )): <h3>No entry found</h3>}
        </div>
      )} 
    </div>
  );
}
