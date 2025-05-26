"use client";
import "@/style/dashboard.scss";

import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import PictureInput from "@/components/PictureInput";
import { useState } from "react";
import axios from "axios";
import Select from "@/components/Select";
import genreOptions from "@/data/genre.json";

export default function BookAdd() {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState({
    value: "",
    label: "Select Category",
  });

  const handleImageChange = (file: any) => {
    setImage(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!bookName || !authorName || !description || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    console.log("data", e);

    const formData = new FormData();
    formData.append("pdf", image);
    formData.append("title", bookName);
    formData.append("name", bookName);
    formData.append("category", category.value);
    formData.append("description", description);

    // Log FormData contents properly
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      // const response = await axios.post("/api/upload", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      console.log("Form data submitted successfully:", formData);

      // if (response.status === 200) {
      //   console.log("Book uploaded successfully:", response.data);
      //   setBookName("");
      //   setAuthorName("");
      //   setDescription("");
      //   setImage(null);
      // } else {
      //   console.error("Error uploading book:", response.data);
      //   alert("Failed to upload book. Try again.");
      // }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <div className="product__container">
        <form onSubmit={handleSubmit}>
          <PictureInput label="Book Image" onChange={handleImageChange} />
          <div
            style={{
              marginTop: "12px",
            }}
            className="input__row"
          >
            <Input
              label="Book Name"
              type="text"
              name="name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <Input
              label="Author Name"
              type="text"
              name="author"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>
          <div
            style={{
              marginTop: "12px",
            }}
            className="input__row"
          >
            <Select
              label="Category"
              options={genreOptions}
              value={category}
              onChange={(value) => setCategory(value)}
            />
          </div>
          <div
            style={{
              marginTop: "12px",
            }}
            className="input__row"
          >
            <TextArea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter book description"
              rows={5}
            />
          </div>
          <div className="save__button">
            <button
              type="submit"
              className="listing__page__header__actions__button"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
