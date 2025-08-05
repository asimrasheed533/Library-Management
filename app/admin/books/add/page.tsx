"use client";

import "@/style/dashboard.scss";

import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import PictureInput from "@/components/PictureInput";
import { useState } from "react";
import axios from "axios";
import Select from "@/components/Select";
import genreOptions from "@/data/genre.json";
import { useRouter } from "next/navigation";
import InputFile from "@/components/InputFile";
import { SyncLoader } from "react-spinners";

export default function BookAdd() {
  const router = useRouter();
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrice, setIsPrice] = useState("");
  const [isIspn, setIsIspn] = useState("");
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [category, setCategory] = useState({
    value: "",
    label: "Select Category",
  });

  const [loading, setLoading] = useState(false);

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
    if (pdf) {
      formData.append("pdf", pdf);
    }
    formData.append("image", image);
    formData.append("price", isPrice);
    formData.append("ispn", isIspn);
    formData.append("author", authorName);
    formData.append("title", bookName);
    formData.append("name", bookName);
    formData.append("category", category.value);
    formData.append("description", description);

    try {
      setLoading(true);
      const response = await axios.post("/api/books/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Book uploaded successfully!");
        router.push("/admin/books");
      } else {
        console.error("Error uploading book:", response.data);
        alert("Failed to upload book. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    } finally {
      setBookName("");
      setAuthorName("");
      setDescription("");
      setPdf(null);
      setImage(null);
      setIsPrice("");
      setIsIspn("");
      setCategory({ value: "", label: "Select Category" });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="product__container">
        <form onSubmit={handleSubmit}>
          <div
            style={{
              marginTop: "12px",
            }}
            className="input__row"
          >
            <PictureInput
              label="Book Image"
              onChange={handleImageChange}
              value={image}
            />
            <InputFile label="Book Pdf" onChange={setPdf} value={pdf} />
          </div>

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
            <Input
              label="Price"
              type="number"
              name="price"
              value={isPrice}
              onChange={(e) => setIsPrice(e.target.value)}
            />
            <Input
              label="ISPN"
              type="number"
              name="ispn"
              value={isIspn}
              onChange={(e) => setIsIspn(e.target.value)}
            />
          </div>
          <div
            style={{
              marginTop: "12px",
            }}
            className="input__row"
          >
            <Select
              placeholder="Select Category"
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
              disabled={loading}
            >
              {loading ? <SyncLoader color="white" size={8} /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
