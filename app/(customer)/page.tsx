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
}: {
  title: string;
  author: string;
  image: string;
}) {
  return (
    <div className="book__card__container">
      <Image
        className="book__card__image"
        src={image}
        alt={title}
        width={400}
        height={300}
      />
      <div className="book__card__name">{title}</div>
      <div className="book__card__author">{author}</div>
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
