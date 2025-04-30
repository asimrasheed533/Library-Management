import "@/style/home.scss";
export default function Home() {
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
          <div class="search-container">
            <div class="search__bar">
              <input
                type="text"
                placeholder="Search for books, authors, or topics..."
              />
              <button className="search__button">
                <span class="icon">🔍</span> Search
              </button>
            </div>
            <div class="categories">
              <span>Popular categories:</span>
              <div class="category__tags">
                <span class="tag">Adventure</span>
                <span class="tag">Classic</span>
                <span class="tag">Detective</span>
                <span class="tag">Fiction</span>
                <span class="tag">Gothic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      =
    </>
  );
}
