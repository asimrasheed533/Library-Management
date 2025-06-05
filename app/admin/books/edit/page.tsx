"use client";

import "@/style/dashboard.scss";

import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import PictureInput from "@/components/PictureInput";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "@/components/Select";
import genreOptions from "@/data/genre.json";
import { useRouter, useSearchParams } from "next/navigation";
import InputFile from "@/components/InputFile";
import { SyncLoader } from "react-spinners";
import useQuery from "@/hooks/useQuery";
import { Book } from "@/constant/types";

export default function EditBook() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading } = useQuery<Book>("/api/books/" + id);

  console.log("Book data:", data);

  const router = useRouter();
  const [bookName, setBookName] = useState(data ? data.name : "");
  const [authorName, setAuthorName] = useState(data ? data.author : "");
  const [description, setDescription] = useState(data ? data.description : "");
  const [image, setImage] = useState(data ? data.imagePath : null);
  const [pdf, setPdf] = useState(data ? data.pdfPath : null);
  const [category, setCategory] = useState({
    value: data ? data.category : "",
    label: data ? data.category : "Select Category",
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
    formData.append("id", id || "");
    formData.append("image", image);
    formData.append("author", authorName);
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
      setLoading(true);
      const response = await axios.put("/api/books/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("Book updated successfully!");
        router.push("/admin/books");
      } else {
        console.error("Error updating book:", response.data);
        alert("Failed to update book. Try again.");
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
      setCategory({ value: "", label: "Select Category" });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setBookName(data.name);
      setAuthorName(data.author);
      setDescription(data.description);
      setImage(data.imagePath);
      setPdf(data.pdfPath);
      setCategory({
        value: data.category,
        label: data.category,
      });
    }
  }, [data]);

  return (
    <>
      <div className="product__container">
        {isLoading ? (
          <div className="listing__page__table__loading">
            <SyncLoader color="#FFD700" />
          </div>
        ) : data ? (
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
              <InputFile
                label="Book Pdf"
                onChange={setPdf}
                value={pdf}
                multiple={false}
              />
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
        ) : (
          <p>Book not found.</p>
        )}
      </div>
    </>
  );
}
