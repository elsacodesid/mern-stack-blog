import React, { useContext } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function AddNewBlog() {
  const { formData, setFormData, isEdit, setIsEdit } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(formData);
  async function handleSaveToDb() {
    const response = isEdit ? await axios.put(`http://localhost:5000/api/blogs/update/${location.state.getCurrentPost._id}`, {
      title: formData.title,
      description: formData.description
    }) : await axios.post("http://localhost:5000/api/blogs/add", {
      title: formData.title,
      description: formData.description,
    });

    const result = await response.data;

    if (result) {
      setIsEdit(false)
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }
  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { getCurrentPost } = location.state;
      setIsEdit(true)
      setFormData({
        title: getCurrentPost.title,
        description: getCurrentPost.description
      })
    }
  }, [location]);
  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit Entry" : "Add New Entry" }</h1>
      <div className={classes.formWrapper}>
        <input
          name="title"
          placeholder="Enter Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Your entry goes here..."
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        ></textarea>
        <button onClick={handleSaveToDb}>{isEdit ? "Edit Entry" : "Add New Entry" }</button>
      </div>
    </div>
  );
}
