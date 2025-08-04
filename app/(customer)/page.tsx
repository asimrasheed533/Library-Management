"use client";
import { Book } from "@/constant/types";
import useQuery from "@/hooks/useQuery";
import "@/style/home.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import bookbanner from "@/public/bookbanner.jpg";
export default function Home() {
  const { data, isLoading } = useQuery<Book[]>("/api/books");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredBooks(data);
    }
  }, [data]);

  // Real-time search as user types
  useEffect(() => {
    if (!data) return;

    if (searchQuery.trim() === "") {
      setFilteredBooks(data);
      return;
    }

    const filtered = data.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchQuery, data]);

  const handleSearch = () => {
    if (!data) return;

    if (searchQuery.trim() === "") {
      setFilteredBooks(data);
      return;
    }

    const filtered = data.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (data) {
      setFilteredBooks(data);
    }
  };

  return (
    <>
      <div className="home__page__container">
        <div className="home__page__container__img">
          <Image src={bookbanner} alt="book" />
        </div>

        <div className="home__page__text__warper">
          <div className="home__page__text__title">
            Discover, Download, and Read Thousands of eBooks
          </div>
          <div className="home__page__text__sub__title">
            Your digital library with free access to classic literature,
            academic resources, and more.
          </div>
          <div className="search__container">
            <div className="search__bar">
              <input
                type="text"
                placeholder="Search for books, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button className="search__button" onClick={handleSearch}>
                <span className="icon">🔍</span> Search
              </button>
              {searchQuery.trim() !== "" && (
                <button className="clear__button" onClick={handleClearSearch}>
                  <span className="icon">✕</span> Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="book__card__warper___title__title">
        Popular Books Our Library
      </div>
      <div className="book__card__warper">
        {isLoading ? (
          <div className="loading">Loading books...</div>
        ) : filteredBooks?.length ? (
          filteredBooks.map((book) => (
            <BookCard
              id={book.id}
              key={book.id}
              price={book.price}
              title={book.title}
              author={book.author}
              image={book.imagePath}
            />
          ))
        ) : (
          <div className="no-books">
            {searchQuery.trim() !== ""
              ? `No books found matching "${searchQuery}"`
              : "No books available"}
          </div>
        )}
      </div>
      {/* what will you learn */}
      <div className="learn__container">
        <div className="learn__container__text__warper">
          <div className="learn__container__text__heading">Book Overview</div>
          <div className="learn__container__text__subheading">
            "An inspiring story that explores deep human emotions and
            relationships, making it a timeless read for all ages." "A
            comprehensive guide filled with practical insights, perfect for
            students and professionals alike." "A gripping novel that combines
            mystery, drama, and unexpected twists to keep readers engaged until
            the last page." "An essential reference book that covers the
            fundamentals of the subject with clear explanations and examples."
          </div>
        </div>
        <div className="learn__points__warper">
          <div className="learn__points__entry">
            <div className="learn__points__entry__number">1</div>
            <div className="learn__points__entry__text">
              <div className="learn__points__entry__text__title">
                Foundations of the Product Manager Role
              </div>
              <div className="learn__points__entry__text__subtitle">
                Understand what a product manager does, how they contribute to a
                team, and the skills required to succeed in the role.
              </div>
            </div>
          </div>
          <div className="learn__points__entry">
            <div className="learn__points__entry__number">1</div>
            <div className="learn__points__entry__text">
              <div className="learn__points__entry__text__title">
                User-Centered Thinking and Research
              </div>
              <div className="learn__points__entry__text__subtitle">
                Gain insights into how to conduct user research, gather
                feedback, and design products that solve real customer problems.
              </div>
            </div>
          </div>
          <div className="learn__points__entry">
            <div className="learn__points__entry__number">1</div>
            <div className="learn__points__entry__text">
              <div className="learn__points__entry__text__title">
                Navigating Career Growth in Product Management
              </div>
              <div className="learn__points__entry__text__subtitle">
                Explore real-world career paths, common challenges, and
                strategies for growing from entry-level PM roles to leadership
                positions.
              </div>
            </div>
          </div>
          <div className="learn__points__entry">
            <div className="learn__points__entry__number">1</div>
            <div className="learn__points__entry__text">
              <div className="learn__points__entry__text__title">
                How to Build and Deliver Great Products
              </div>
              <div className="learn__points__entry__text__subtitle">
                Learn how to define product vision, prioritize features, work
                with cross-functional teams, and manage product lifecycles
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* chapter brekdown */}
      <div className="breakdown__container">
        <div className="breakdown__title__warper">
          <div className="breakdown__title">
            How to Product Chapter BreakDown
          </div>
          <div className="breakdown__subtitle">
            Short description about each chapter, Have any question? Contact me
          </div>
        </div>
        <div className="breakdown__detail__warper">
          <div className="breakdown__detail__text">
            A practical and insightful guide that traces the real-world path
            into product management, covering key skills, challenges, and
            strategies needed to succeed in the role. Ideal for aspiring product
            managers and professionals looking to transition into the field.
          </div>
          <div className="breakdown__detail__image">
            <img
              src="https://res.cloudinary.com/dsxbqyjwo/image/upload/v1746016072/2575_vjen3c.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

function BookCard({
  title,
  author,
  image,
  price,
  id,
}: {
  id: string;
  title: string;
  author: string;
  price: string;
  image: string;
}) {
  return (
    <Link href={id} className="book__card__container">
      <Image
        className="book__card__image"
        src={image}
        alt={title}
        width={400}
        height={300}
      />
      <div className="book__card__name">{title}</div>
      <div className="book__card__name">${price}</div>
      <div className="book__card__author">
        <span>Author Name:</span>
        {author}
      </div>
    </Link>
  );
}
