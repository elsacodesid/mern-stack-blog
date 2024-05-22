import React, { useContext } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";

export default function AddNewBlog() {
  const { formData, setFormData } = useContext(GlobalContext);
  console.log(formData);
  async function handleSaveToDb() {
    const response = await axios.post("http://localhost:5000/api/blogs/add", {
      title: formData.title,
      description: formData.description,
    });

    const result = await response.data;

    console.log(result);
  }
  return (
    <div className={classes.wrapper}>
      <h1>Add a blog</h1>
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
        <button onClick={handleSaveToDb}>Add New Blog Entry</button>
      </div>
    </div>
  );
}
