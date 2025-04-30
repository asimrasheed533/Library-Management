import PageBanner from "@/components/PageBanner";
import "@/style/home.scss";
import Image from "next/image";
export default function BookDetail() {
  return (
    <>
      <PageBanner title="Book Detail" />
      <div className="bookDetail__container">
        <div className="bookDetail__container__left">
          <Image
            className="bookDetail__container__left__img"
            width={300}
            height={300}
            src="https://res.cloudinary.com/dsxbqyjwo/image/upload/v1746016072/2575_vjen3c.jpg"
            alt="library"
          />

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
        </div>
        <div className="bookDetail__container__right">
          <div className="bookDetail__container__right__title">
            Pride and Prejudice
          </div>
          <div className="bookDetail__container__right__author">
            Jane Austen
          </div>
          <div className="book__detail__line" />
          <div className="book__detail__about__title">About this book</div>
          <div className="book__detail__about__sub__title">
            Pride and Prejudice follows the turbulent relationship between
            Elizabeth Bennet, the daughter of a country gentleman, and
            Fitzwilliam Darcy, a rich aristocratic landowner. They must overcome
            the titular sins of pride and prejudice in order to fall in love and
            marry.
          </div>
        </div>
      </div>
    </>
  );
}
