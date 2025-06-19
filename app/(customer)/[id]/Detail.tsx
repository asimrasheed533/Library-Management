"use client";
import PageBanner from "@/components/PageBanner";
import { Book } from "@/constant/types";
import useQuery from "@/hooks/useQuery";
import "@/style/home.scss";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
export default function Detail({ token }: { token: string | null }) {
  const { id } = useParams();
  const { data, isLoading } = useQuery<Book>(`/api/books/${id}`);

  return (
    <>
      <PageBanner title="Book Detail" />
      <div className="bookDetail__container">
        <div className="bookDetail__container__left">
          <Image
            className="bookDetail__container__left__img"
            width={300}
            height={300}
            src={data?.imagePath || "/placeholder-image.jpg"}
            alt="library"
          />

          {token ? (
            <>
              <button className="bookDetail__container__left__download">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-download"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Book
              </button>
              <button
                className="bookDetail__container__left__download"
                style={{
                  backgroundColor: "#000",
                }}
              >
                Read Book
              </button>
            </>
          ) : (
            <div
              className="bookDetail__container__left__disclaimer"
              style={{
                padding: "10px",
                marginTop: "15px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "4px",
                color: "#6c757d",
                textAlign: "center",
              }}
            >
              <Link href="/signIn" style={{ margin: 0, color: "black" }}>
                Sign in to Download or Read this book.
              </Link>
            </div>
          )}
        </div>
        <div className="bookDetail__container__right">
          <div className="bookDetail__container__right__title">
            {data?.name}
          </div>
          <div className="bookDetail__container__right__author">
            {data?.author}
          </div>
          <div className="book__detail__line" />
          <div className="book__detail__about__title">About this book</div>
          <div className="book__detail__about__sub__title">
            {data?.description}
          </div>
        </div>
      </div>
    </>
  );
}
