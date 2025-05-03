"use client";
import "@/style/dashboard.scss";

import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import PictureInput from "@/components/PictureInput";
import { useState } from "react";
import axios from "axios";

export default function BookAdd() {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (file: any) => {
    setImage(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!bookName || !authorName || !description || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", image);
    formData.append("title", bookName);
    formData.append("name", bookName);
    formData.append("description", description);
    formData.append("userId", "user-id-here");

    console.log("fromdata", formData);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Book uploaded successfully:", response.data);
        setBookName("");
        setAuthorName("");
        setDescription("");
        setImage(null);
      } else {
        console.error("Error uploading book:", response.data);
        alert("Failed to upload book. Try again.");
      }
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
            <TextArea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
