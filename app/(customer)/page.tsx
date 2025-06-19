"use client";
import useQuery from "@/hooks/useQuery";
import "@/style/home.scss";
import { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  const { data, isLoading } = useQuery<Book[]>("/api/books");
  console.log("data", data);

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
          <div className="search__container">
            <div className="search__bar">
              <input
                type="text"
                placeholder="Search for books, authors, or topics..."
              />
              <button className="search__button">
                <span className="icon">🔍</span> Search
              </button>
            </div>
            {/* <div className="categories">
              <span>Popular categories:</span>
              <div className="category__tags">
                <span className="tag">Adventure</span>
                <span className="tag">Classic</span>
                <span className="tag">Detective</span>
                <span className="tag">Fiction</span>
                <span className="tag">Gothic</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="book__card__warper___title__title">
        Popular Books Our Library
      </div>
      <div className="book__card__warper">
        {isLoading ? (
          <div className="loading">Loading books...</div>
        ) : data?.length ? (
          data.map((book) => (
            <BookCard
              id={book.id}
              key={book.id}
              title={book.title}
              author={book.author}
              image={book.imagePath}
            />
          ))
        ) : (
          <div className="no-books">No books available</div>
        )}
      </div>
      {/* what will you learn */}
      <div className="learn__container">
        <div className="learn__container__text__warper">
          <div className="learn__container__text__heading">
            What will you learn?
          </div>
          <div className="learn__container__text__subheading">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
            corporis iusto reprehenderit earum perspiciatis at tempora
            distinctio voluptatum deserunt ad natus adipisci delectus pariatur,
            facere porro quae laudantium quisquam dolorem optio totam vitae
            saepe, deleniti perferendis! Ducimus eum laudantium alias
            voluptates, possimus nam inventore ea voluptas dignissimos facilis
            aperiam earum.quae laudantium quisquam dolorem optio totam vitae
            saepe, deleniti perferendis! Ducimus eum laudantium alias
            voluptates, possimus nam inventore ea voluptas dignissimos facilis
            aperiam earum.
          </div>
        </div>
        <div className="learn__points__warper">
          <div className="learn__points__entry">
            <div className="learn__points__entry__number">1</div>
            <div className="learn__points__entry__text">
              <div className="learn__points__entry__text__title">
                This typical journey into product management
              </div>
              <div className="learn__points__entry__text__subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                blanditiis id ducimus, recusandae ea soluta. adipisicing elit.
                Esse blanditiis id ducimus, recusandae ea soluta.
              </div>
            </div>
          </div>
          <div className="learn__points__entry">
            <div className="learn__points__entry__number">1</div>
            <div className="learn__points__entry__text">
              <div className="learn__points__entry__text__title">
                This typical journey into product management
              </div>
              <div className="learn__points__entry__text__subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                blanditiis id ducimus, recusandae ea soluta. adipisicing elit.
                Esse blanditiis id ducimus, recusandae ea soluta.
              </div>
            </div>
          </div>
          <div className="learn__points__entry">
            <div className="learn__points__entry__number">1</div>
            <div className="learn__points__entry__text">
              <div className="learn__points__entry__text__title">
                This typical journey into product management
              </div>
              <div className="learn__points__entry__text__subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                blanditiis id ducimus, recusandae ea soluta. adipisicing elit.
                Esse blanditiis id ducimus, recusandae ea soluta.
              </div>
            </div>
          </div>
          <div className="learn__points__entry">
            <div className="learn__points__entry__number">1</div>
            <div className="learn__points__entry__text">
              <div className="learn__points__entry__text__title">
                This typical journey into product management
              </div>
              <div className="learn__points__entry__text__subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                blanditiis id ducimus, recusandae ea soluta. adipisicing elit.
                Esse blanditiis id ducimus, recusandae ea soluta.
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
            Short discription about each chapter, Have any question? Contact me
          </div>
        </div>
        <div className="breakdown__detail__warper">
          <div className="breakdown__detail__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, consequatur alias animi obcaecati, dolorem expedita
            placeat quis quisquam maxime optio sint, quidem exercitationem.
            Neque, dignissimos. Placeat ratione esse vel tempora amet quasi,
            omnis qui ab debitis eos obcaecati saepe. Cupiditate dolor ipsum
            nemo odio sint officia ipsam neque voluptas, harum voluptatem,
            distinctio esse voluptatum excepturi nam suscipit vel incidunt
            quasi!
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
  id,
}: {
  id: string;
  title: string;
  author: string;
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
      <div className="book__card__author">{author}</div>
    </Link>
  );
}
