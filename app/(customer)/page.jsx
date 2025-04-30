import "@/style/home.scss";
import Image from "next/image";
export default function Home() {
  const books = [
    {
      id: 1,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      image:
        "https://res.cloudinary.com/dsxbqyjwo/image/upload/v1746016072/2575_vjen3c.jpg",
    },
    {
      id: 2,
      title: "Moby Dick",
      author: "Herman Melville",
      image:
        "https://res.cloudinary.com/dsxbqyjwo/image/upload/v1746016072/2575_vjen3c.jpg",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      image:
        "https://res.cloudinary.com/dsxbqyjwo/image/upload/v1746016072/2575_vjen3c.jpg",
    },
  ];

  return (
    <>
      <div className="home__page__container">
        <div className="home__page__text__warper">
          <div className="home__page__text__title">
            Discover, Download, and Read Thousands of eBooks
          </div>
          <div className="home__page__text__sub__title">
            Your digital library with free access to classic literature,
            academic resources, and more.
          </div>
          <div className="search-container">
            <div className="search__bar">
              <input
                type="text"
                placeholder="Search for books, authors, or topics..."
              />
              <button className="search__button">
                <span className="icon">🔍</span> Search
              </button>
            </div>
            <div className="categories">
              <span>Popular categories:</span>
              <div className="category__tags">
                <span className="tag">Adventure</span>
                <span className="tag">Classic</span>
                <span className="tag">Detective</span>
                <span className="tag">Fiction</span>
                <span className="tag">Gothic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="book__card__warper___title__title">
        Popular Books Our Library
      </div>
      <div className="book__card__warper">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            image={book.image}
          />
        ))}
      </div>
    </>
  );
}

function BookCard({}) {
  return (
    <div className="book__card__container">
      <Image
        className="book__card__image"
        src="https://res.cloudinary.com/dsxbqyjwo/image/upload/v1746016072/2575_vjen3c.jpg"
        alt="Book 1"
        width={400}
        height={300}
      />
      <div className="book__card__name">Pride and Prejudice</div>
      <div className="book__card__author">Jane Austen</div>
      <div className="book__card__download__button">
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
      </div>
    </div>
  );
}

function undefined({}) {
  return (
    <div className="book__card__container">
      <Image
        className="book__card__image"
        src="https://res.cloudinary.com/dsxbqyjwo/image/upload/v1746016072/2575_vjen3c.jpg"
        alt="Book 1"
        width={400}
        height={300}
      />
      <div className="book__card__name">Pride and Prejudice</div>
      <div className="book__card__author">Jane Austen</div>
      <div className="book__card__download__button">
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
      </div>
    </div>
  );
}
